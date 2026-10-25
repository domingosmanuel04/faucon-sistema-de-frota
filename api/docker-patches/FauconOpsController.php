<?php

namespace Fleetbase\Http\Controllers\Internal\v1;

use Fleetbase\Http\Controllers\Controller;
use Fleetbase\Support\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

/**
 * Faucon modules: POD, costs, WhatsApp, payments, predictions, anomalies, health.
 */
class FauconOpsController extends Controller
{
    private const COST_KEY = 'faucon.cost_rates';
    private const WA_KEY = 'faucon.whatsapp';
    private const PAY_KEY = 'faucon.payments_local';
    private const FEATURES_KEY = 'faucon.features';

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!Auth::getUserFromSession($request)) {
                return response()->error('Unauthenticated.', 401);
            }

            return $next($request);
        });
    }

    /* ───────────── POD ───────────── */

    public function getPod(Request $request, string $orderUuid): JsonResponse
    {
        $order = $this->findOrder($orderUuid, $this->companyUuid($request));
        if (!$order) {
            return response()->error('Order not found', 404);
        }
        $meta = $this->decodeMeta($order->meta ?? null);

        return response()->json([
            'order_uuid' => $order->uuid,
            'public_id' => $order->public_id,
            'pod_required' => (bool) ($order->pod_required ?? false),
            'pod_method' => $order->pod_method ?? null,
            'pod' => $meta['faucon_pod'] ?? null,
            'complete' => $this->podIsComplete($meta['faucon_pod'] ?? null),
        ]);
    }

    public function savePod(Request $request, string $orderUuid): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $order = $this->findOrder($orderUuid, $companyUuid);
        if (!$order) {
            return response()->error('Order not found', 404);
        }

        $pod = [
            'photos' => array_values(array_slice((array) $request->input('photos', []), 0, 8)),
            'signature' => $request->input('signature'),
            'otp' => $request->input('otp'),
            'otp_verified' => (bool) $request->input('otp_verified', false),
            'checklist' => (array) $request->input('checklist', []),
            'refused' => (bool) $request->input('refused', false),
            'reason' => $request->input('reason'),
            'recipient_name' => $request->input('recipient_name'),
            'captured_at' => Carbon::now()->toIso8601String(),
            'captured_by' => optional(Auth::getUserFromSession($request))->uuid ?? null,
        ];

        if ($pod['refused'] && empty($pod['reason'])) {
            return response()->error('Motivo obrigatório quando POD é recusado.', 422);
        }

        $meta = $this->decodeMeta($order->meta ?? null);
        $meta['faucon_pod'] = $pod;

        DB::table('orders')->where('uuid', $order->uuid)->update([
            'meta' => json_encode($meta),
            'pod_required' => 1,
            'pod_method' => $request->input('pod_method', $order->pod_method ?: 'photo_signature_otp'),
            'updated_at' => Carbon::now(),
        ]);

        $proofUuid = null;
        if ($this->podIsComplete($pod)) {
            $proofUuid = $this->ensureProofRecord($order, $pod);
            if ($proofUuid) {
                $meta['faucon_pod']['proof_uuid'] = $proofUuid;
                DB::table('orders')->where('uuid', $order->uuid)->update(['meta' => json_encode($meta)]);
            }
        }

        $this->enableFeature('pod_advanced');

        return response()->json([
            'saved' => true,
            'pod' => $meta['faucon_pod'] ?? $pod,
            'complete' => $this->podIsComplete($pod),
            'proof_uuid' => $proofUuid,
        ]);
    }

    public function canComplete(Request $request, string $orderUuid): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $order = $this->findOrder($orderUuid, $companyUuid);
        if (!$order) {
            return response()->error('Order not found', 404);
        }
        $gate = $this->completionGate($order, $companyUuid);

        return response()->json($gate);
    }

    public function completeOrder(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $orderUuid = (string) $request->input('order_uuid');
        if (!$orderUuid) {
            return response()->error('order_uuid required', 422);
        }
        $order = $this->findOrder($orderUuid, $companyUuid);
        if (!$order) {
            return response()->error('Order not found', 404);
        }
        if (in_array($order->status, ['completed', 'complete', 'delivered', 'canceled', 'cancelled'], true)) {
            return response()->json([
                'completed' => false,
                'already_done' => true,
                'status' => $order->status,
            ]);
        }

        $gate = $this->completionGate($order, $companyUuid);
        $force = (bool) $request->input('force', false);
        if (!$gate['allowed'] && !$force) {
            return response()->json(array_merge($gate, [
                'completed' => false,
                'error' => $gate['reason'] ?? 'POD obrigatório incompleto',
            ]), 422);
        }
        if ($force && !$gate['allowed']) {
            $reason = trim((string) $request->input('force_reason', ''));
            if ($reason === '') {
                return response()->error('force_reason obrigatório para forçar conclusão sem POD.', 422);
            }
        }

        $meta = $this->decodeMeta($order->meta ?? null);
        $pod = $meta['faucon_pod'] ?? null;
        $proofUuid = is_array($pod) ? ($pod['proof_uuid'] ?? null) : null;
        if (!$proofUuid && is_array($pod) && $this->podIsComplete($pod)) {
            $proofUuid = $this->ensureProofRecord($order, $pod);
        }

        $meta['faucon_completion'] = [
            'completed_at' => Carbon::now()->toIso8601String(),
            'completed_by' => optional(Auth::getUserFromSession($request))->uuid,
            'source' => $request->input('source', 'control_tower'),
            'forced' => $force && !$gate['allowed'],
            'force_reason' => $force ? $request->input('force_reason') : null,
            'proof_uuid' => $proofUuid,
            'pod_complete' => $this->podIsComplete(is_array($pod) ? $pod : null),
        ];

        DB::table('orders')->where('uuid', $orderUuid)->update([
            'status' => 'completed',
            'meta' => json_encode($meta),
            'updated_at' => Carbon::now(),
        ]);

        return response()->json([
            'completed' => true,
            'order_uuid' => $orderUuid,
            'public_id' => $order->public_id,
            'status' => 'completed',
            'proof_uuid' => $proofUuid,
            'gate' => $gate,
        ]);
    }

    public function podQueue(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $q = DB::table('orders')->whereNull('deleted_at');
        if ($companyUuid) {
            $q->where('company_uuid', $companyUuid);
        }
        $rows = $q->whereIn('status', ['dispatched', 'started', 'in_progress', 'en_route', 'active', 'driver_enroute'])
            ->orderByDesc('updated_at')
            ->limit(40)
            ->get(['uuid', 'public_id', 'status', 'pod_required', 'pod_method', 'meta', 'driver_assigned_uuid']);

        $items = [];
        foreach ($rows as $row) {
            $meta = $this->decodeMeta($row->meta ?? null);
            $pod = $meta['faucon_pod'] ?? null;
            $photos = is_array($pod) ? array_values(array_filter((array) ($pod['photos'] ?? []))) : [];
            $items[] = [
                'uuid' => $row->uuid,
                'public_id' => $row->public_id,
                'status' => $row->status,
                'pod_required' => (bool) $row->pod_required,
                'has_pod' => !empty($pod),
                'pod_complete' => $this->podIsComplete($pod),
                'driver_assigned' => !empty($row->driver_assigned_uuid),
                'photos' => array_slice($photos, 0, 4),
                'recipient_name' => is_array($pod) ? ($pod['recipient_name'] ?? null) : null,
                'proof_uuid' => is_array($pod) ? ($pod['proof_uuid'] ?? null) : null,
                'captured_at' => is_array($pod) ? ($pod['captured_at'] ?? null) : null,
                'refused' => is_array($pod) ? !empty($pod['refused']) : false,
            ];
        }

        return response()->json(['count' => count($items), 'orders' => $items]);
    }

    /* ───────────── Assign confirm ───────────── */

    public function assignConfirm(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $orderUuid = (string) $request->input('order_uuid');
        $driverUuid = (string) $request->input('driver_uuid');
        if (!$orderUuid || !$driverUuid) {
            return response()->error('order_uuid and driver_uuid required', 422);
        }
        $order = $this->findOrder($orderUuid, $companyUuid);
        if (!$order) {
            return response()->error('Order not found', 404);
        }
        $driverQ = DB::table('drivers')->where('uuid', $driverUuid)->whereNull('deleted_at');
        if ($companyUuid) {
            $driverQ->where('company_uuid', $companyUuid);
        }
        $driver = $driverQ->first();
        if (!$driver) {
            return response()->error('Driver not found', 404);
        }

        $meta = $this->decodeMeta($order->meta ?? null);
        $meta['faucon_assignment'] = [
            'driver_uuid' => $driverUuid,
            'confirmed_at' => Carbon::now()->toIso8601String(),
            'confirmed_by' => optional(Auth::getUserFromSession($request))->uuid,
            'source' => $request->input('source', 'control_tower'),
        ];

        DB::table('orders')->where('uuid', $orderUuid)->update([
            'driver_assigned_uuid' => $driverUuid,
            'meta' => json_encode($meta),
            'updated_at' => Carbon::now(),
        ]);

        return response()->json([
            'assigned' => true,
            'order_uuid' => $orderUuid,
            'driver_uuid' => $driverUuid,
            'driver_id' => $driver->public_id ?? null,
        ]);
    }

    /* ───────────── Delay prediction ───────────── */

    public function delayPrediction(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $this->enableFeature('delay_prediction');

        $avgSeconds = null;
        if (Schema::hasTable('orders')) {
            $avg = DB::table('orders')
                ->whereNull('deleted_at')
                ->when($companyUuid, fn ($q) => $q->where('company_uuid', $companyUuid))
                ->whereNotNull('time')
                ->where('time', '>', 0)
                ->avg('time');
            $avgSeconds = $avg ? (int) $avg : null;
        }
        $baseline = $avgSeconds ?: 45 * 60;

        $q = DB::table('orders')->whereNull('deleted_at');
        if ($companyUuid) {
            $q->where('company_uuid', $companyUuid);
        }
        $active = $q->whereIn('status', ['dispatched', 'started', 'in_progress', 'en_route', 'active'])
            ->limit(50)
            ->get(['uuid', 'public_id', 'status', 'dispatched_at', 'started_at', 'scheduled_at', 'time', 'created_at']);

        $now = Carbon::now();
        $predictions = [];
        foreach ($active as $row) {
            $start = $row->started_at ?: ($row->dispatched_at ?: $row->created_at);
            $elapsed = $start ? $now->diffInSeconds(Carbon::parse($start)) : 0;
            $expected = $row->time && $row->time > 0 ? (int) $row->time : $baseline;
            $ratio = $expected > 0 ? $elapsed / $expected : 0;
            $risk = $ratio >= 1.25 ? 'high' : ($ratio >= 0.9 ? 'medium' : 'low');
            $predictions[] = [
                'order_uuid' => $row->uuid,
                'public_id' => $row->public_id,
                'status' => $row->status,
                'elapsed_seconds' => $elapsed,
                'expected_seconds' => $expected,
                'delay_risk' => $risk,
                'delay_probability' => round(min(0.95, max(0.05, $ratio * 0.7)), 2),
                'method' => 'heuristic_v1',
            ];
        }

        usort($predictions, fn ($a, $b) => $b['delay_probability'] <=> $a['delay_probability']);

        return response()->json([
            'baseline_seconds' => $baseline,
            'count' => count($predictions),
            'predictions' => $predictions,
        ]);
    }

    /* ───────────── Anomalies ───────────── */

    public function anomalies(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $this->enableFeature('anomaly_detection');
        $items = [];

        if (Schema::hasTable('orders')) {
            $q = DB::table('orders')->whereNull('deleted_at');
            if ($companyUuid) {
                $q->where('company_uuid', $companyUuid);
            }
            foreach ($q->whereNotNull('distance')->where('distance', '>', 200000)->limit(20)->get(['uuid', 'public_id', 'distance', 'status']) as $row) {
                $items[] = [
                    'type' => 'distance_outlier',
                    'severity' => 'medium',
                    'title' => 'Distância anormalmente alta',
                    'ref' => $row->public_id,
                    'detail' => round(((int) $row->distance) / 1000, 1) . ' km',
                ];
            }
        }

        if (Schema::hasTable('fuel_reports')) {
            $fq = DB::table('fuel_reports')->whereNull('deleted_at');
            if ($companyUuid) {
                $fq->where('company_uuid', $companyUuid);
            }
            foreach ($fq->orderByDesc('created_at')->limit(30)->get() as $row) {
                $vol = is_numeric($row->volume) ? (float) $row->volume : 0;
                $amt = is_numeric($row->amount) ? (float) $row->amount : 0;
                if ($vol > 0 && $amt / $vol > 5000) {
                    $items[] = [
                        'type' => 'fuel_price_outlier',
                        'severity' => 'high',
                        'title' => 'Preço/litro anormal',
                        'ref' => $row->public_id ?? $row->uuid,
                        'detail' => 'amount=' . $amt . ' volume=' . $vol,
                    ];
                }
                if ($vol > 400) {
                    $items[] = [
                        'type' => 'fuel_volume_outlier',
                        'severity' => 'medium',
                        'title' => 'Volume de combustível elevado',
                        'ref' => $row->public_id ?? $row->uuid,
                        'detail' => $vol . ' ' . ($row->metric_unit ?: 'L'),
                    ];
                }
            }
        }

        if (Schema::hasTable('vehicles') && Schema::hasColumn('vehicles', 'online')) {
            $vq = DB::table('vehicles')->whereNull('deleted_at')->where('online', 1);
            if ($companyUuid) {
                $vq->where('company_uuid', $companyUuid);
            }
            // online with no recent update (>24h) if updated_at exists
            foreach ($vq->where('updated_at', '<', Carbon::now()->subDay())->limit(15)->get(['uuid', 'public_id', 'updated_at']) as $row) {
                $items[] = [
                    'type' => 'stale_online_vehicle',
                    'severity' => 'low',
                    'title' => 'Veículo marcado online sem atualização recente',
                    'ref' => $row->public_id ?? $row->uuid,
                    'detail' => (string) $row->updated_at,
                ];
            }
        }

        return response()->json(['count' => count($items), 'anomalies' => $items]);
    }

    /* ───────────── Costs ───────────── */

    public function getCostRates(Request $request): JsonResponse
    {
        return response()->json(['rates' => $this->costRates()]);
    }

    public function saveCostRates(Request $request): JsonResponse
    {
        $rates = array_merge($this->costRates(), [
            'fuel_price_per_liter' => (float) $request->input('fuel_price_per_liter', 800),
            'liters_per_100km' => (float) $request->input('liters_per_100km', 12),
            'driver_cost_per_hour' => (float) $request->input('driver_cost_per_hour', 1500),
            'maintenance_per_km' => (float) $request->input('maintenance_per_km', 25),
            'currency' => (string) $request->input('currency', 'AOA'),
        ]);
        $this->putSetting(self::COST_KEY, $rates);
        $this->enableFeature('cost_per_delivery');

        return response()->json(['saved' => true, 'rates' => $rates]);
    }

    public function costSummary(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $rates = $this->costRates();
        $this->enableFeature('cost_per_delivery');

        $q = DB::table('orders')->whereNull('deleted_at');
        if ($companyUuid) {
            $q->where('company_uuid', $companyUuid);
        }
        $orders = $q->whereIn('status', ['completed', 'complete', 'delivered', 'dispatched', 'started'])
            ->orderByDesc('updated_at')
            ->limit(40)
            ->get(['uuid', 'public_id', 'status', 'distance', 'time']);

        $rows = [];
        $total = 0.0;
        foreach ($orders as $o) {
            $km = max(0, ((int) ($o->distance ?? 0)) / 1000);
            $hours = max(0, ((int) ($o->time ?? 0)) / 3600);
            if ($km <= 0 && $hours <= 0) {
                $km = 8; // fallback estimate
                $hours = 0.5;
            }
            $fuel = ($km / 100) * $rates['liters_per_100km'] * $rates['fuel_price_per_liter'];
            $driver = $hours * $rates['driver_cost_per_hour'];
            $maint = $km * $rates['maintenance_per_km'];
            $cost = round($fuel + $driver + $maint, 2);
            $total += $cost;
            $rows[] = [
                'order_uuid' => $o->uuid,
                'public_id' => $o->public_id,
                'status' => $o->status,
                'km' => round($km, 2),
                'hours' => round($hours, 2),
                'fuel_cost' => round($fuel, 2),
                'driver_cost' => round($driver, 2),
                'maintenance_cost' => round($maint, 2),
                'total_cost' => $cost,
                'currency' => $rates['currency'],
            ];
        }

        return response()->json([
            'rates' => $rates,
            'count' => count($rows),
            'total_cost' => round($total, 2),
            'currency' => $rates['currency'],
            'orders' => $rows,
        ]);
    }

    public function driverSettlement(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $this->enableFeature('driver_settlement');
        $rates = $this->costRates();
        $commission = (float) $request->input('commission_per_order', 500);

        $drivers = DB::table('drivers')->whereNull('deleted_at');
        if ($companyUuid) {
            $drivers->where('company_uuid', $companyUuid);
        }
        $driverRows = $drivers->limit(50)->get(['uuid', 'public_id', 'slug']);

        $items = [];
        foreach ($driverRows as $d) {
            $oq = DB::table('orders')->whereNull('deleted_at')->where('driver_assigned_uuid', $d->uuid);
            if ($companyUuid) {
                $oq->where('company_uuid', $companyUuid);
            }
            $completed = (clone $oq)->whereIn('status', ['completed', 'complete', 'delivered'])->count();
            $active = (clone $oq)->whereIn('status', ['dispatched', 'started', 'in_progress', 'en_route'])->count();
            $pay = round($completed * $commission, 2);
            $items[] = [
                'driver_uuid' => $d->uuid,
                'driver_id' => $d->public_id ?: $d->slug,
                'orders_completed' => $completed,
                'orders_active' => $active,
                'commission_per_order' => $commission,
                'settlement_amount' => $pay,
                'currency' => $rates['currency'],
            ];
        }

        return response()->json(['count' => count($items), 'settlements' => $items]);
    }

    public function invoiceDraft(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $orderUuid = (string) $request->input('order_uuid');
        if (!$orderUuid) {
            return response()->error('order_uuid required', 422);
        }
        if (!Schema::hasTable('ledger_invoices')) {
            return response()->error('Ledger invoices table missing', 501);
        }
        $order = $this->findOrder($orderUuid, $companyUuid);
        if (!$order) {
            return response()->error('Order not found', 404);
        }

        $existing = DB::table('ledger_invoices')->where('order_uuid', $orderUuid)->whereNull('deleted_at')->first();
        if ($existing) {
            return response()->json(['created' => false, 'invoice' => $existing, 'message' => 'Já existe fatura para esta encomenda.']);
        }

        $cost = $this->estimateOrderCost($order);
        $uuid = (string) Str::uuid();
        $publicId = 'inv_' . Str::lower(Str::random(10));
        $number = 'FAU-' . date('Ymd') . '-' . Str::upper(Str::random(4));
        $user = Auth::getUserFromSession($request);

        $row = [
            'uuid' => $uuid,
            'public_id' => $publicId,
            'company_uuid' => $companyUuid ?: $order->company_uuid,
            'created_by_uuid' => $user->uuid ?? null,
            'updated_by_uuid' => $user->uuid ?? null,
            'customer_uuid' => $order->customer_uuid ?? null,
            'customer_type' => $order->customer_type ?? null,
            'order_uuid' => $order->uuid,
            'number' => $number,
            'date' => Carbon::now()->toDateString(),
            'due_date' => Carbon::now()->addDays(7)->toDateString(),
            'subtotal' => (int) round($cost * 100),
            'tax' => 0,
            'total_amount' => (int) round($cost * 100),
            'amount_paid' => 0,
            'balance' => (int) round($cost * 100),
            'currency' => $this->costRates()['currency'] ?? 'AOA',
            'status' => 'draft',
            'notes' => 'Rascunho gerado pela Torre Faucon a partir de ' . ($order->public_id ?: $orderUuid),
            'meta' => json_encode(['source' => 'faucon_auto_invoicing', 'estimated_cost' => $cost]),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
        DB::table('ledger_invoices')->insert($row);
        $this->enableFeature('auto_invoicing');

        return response()->json(['created' => true, 'invoice' => $row]);
    }

    /* ───────────── WhatsApp ───────────── */

    public function getWhatsapp(Request $request): JsonResponse
    {
        return response()->json(['config' => $this->publicWhatsappConfig()]);
    }

    public function saveWhatsapp(Request $request): JsonResponse
    {
        $cfg = array_merge($this->whatsappConfig(), [
            'enabled' => (bool) $request->input('enabled', false),
            'phone_number_id' => (string) $request->input('phone_number_id', ''),
            'business_account_id' => (string) $request->input('business_account_id', ''),
            'default_template_status' => (string) $request->input('default_template_status', 'order_status_pt'),
            'dry_run' => (bool) $request->input('dry_run', true),
        ]);
        if ($request->filled('access_token')) {
            $cfg['access_token'] = (string) $request->input('access_token');
        }
        $this->putSetting(self::WA_KEY, $cfg);
        $this->enableFeature('whatsapp_business');

        return response()->json(['saved' => true, 'config' => $this->publicWhatsappConfig()]);
    }

    public function whatsappDryRun(Request $request): JsonResponse
    {
        $to = (string) $request->input('to', '');
        $message = (string) $request->input('message', 'Olá! A sua encomenda Faucon está a caminho.');
        $orderId = (string) $request->input('order_id', '');
        $cfg = $this->whatsappConfig();

        $payload = [
            'to' => $to,
            'message' => $message,
            'order_id' => $orderId,
            'template' => $cfg['default_template_status'] ?? null,
            'mode' => !empty($cfg['dry_run']) || empty($cfg['access_token']) ? 'dry_run' : 'live_not_wired',
            'at' => Carbon::now()->toIso8601String(),
        ];
        Log::channel('daily')->info('[faucon.whatsapp]', $payload);
        $this->enableFeature('whatsapp_business');

        return response()->json([
            'queued' => true,
            'payload' => $payload,
            'note' => 'Dry-run: mensagem registada nos logs. Configure token Meta para envio real.',
        ]);
    }

    /* ───────────── Payments local ───────────── */

    public function getPayments(Request $request): JsonResponse
    {
        return response()->json(['config' => $this->publicPaymentsConfig()]);
    }

    public function savePayments(Request $request): JsonResponse
    {
        $cfg = array_merge($this->paymentsConfig(), [
            'enabled' => (bool) $request->input('enabled', false),
            'provider' => (string) $request->input('provider', 'multicaixa_express'),
            'merchant_id' => (string) $request->input('merchant_id', ''),
            'sandbox' => (bool) $request->input('sandbox', true),
            'currency' => (string) $request->input('currency', 'AOA'),
        ]);
        if ($request->filled('api_key')) {
            $cfg['api_key'] = (string) $request->input('api_key');
        }
        $this->putSetting(self::PAY_KEY, $cfg);
        $this->enableFeature('payments_local');

        return response()->json(['saved' => true, 'config' => $this->publicPaymentsConfig()]);
    }

    public function paymentIntent(Request $request): JsonResponse
    {
        $amount = (int) $request->input('amount', 0);
        $invoiceUuid = (string) $request->input('invoice_uuid', '');
        $cfg = $this->paymentsConfig();
        if ($amount <= 0) {
            return response()->error('amount (centavos/inteiro) obrigatório', 422);
        }
        $ref = 'MCX-' . strtoupper(Str::random(8));
        $intent = [
            'provider' => $cfg['provider'] ?? 'multicaixa_express',
            'reference' => $ref,
            'amount' => $amount,
            'currency' => $cfg['currency'] ?? 'AOA',
            'invoice_uuid' => $invoiceUuid ?: null,
            'sandbox' => (bool) ($cfg['sandbox'] ?? true),
            'status' => 'pending_stub',
            'checkout_hint' => 'Use a referência ' . $ref . ' no Multicaixa Express (sandbox/stub).',
            'created_at' => Carbon::now()->toIso8601String(),
        ];
        Log::channel('daily')->info('[faucon.payments.intent]', $intent);
        $this->enableFeature('payments_local');

        return response()->json(['intent' => $intent]);
    }

    /* ───────────── Health / observability ───────────── */

    public function health(Request $request): JsonResponse
    {
        $this->enableFeature('observability_sentry');
        $checks = [
            'database' => false,
            'orders_table' => Schema::hasTable('orders'),
            'drivers_table' => Schema::hasTable('drivers'),
            'redis_configured' => !empty(config('database.redis')) || !empty(getenv('REDIS_URL')),
            'sentry_dsn' => !empty(getenv('SENTRY_LARAVEL_DSN') ?: getenv('SENTRY_DSN')),
            'app_name' => config('app.name') ?: getenv('APP_NAME') ?: 'Faucon',
        ];
        try {
            DB::select('select 1');
            $checks['database'] = true;
        } catch (\Throwable $e) {
            $checks['database_error'] = $e->getMessage();
        }

        $failedJobs = 0;
        if (Schema::hasTable('failed_jobs')) {
            $failedJobs = DB::table('failed_jobs')->count();
        }

        $ok = $checks['database'] && $checks['orders_table'];

        return response()->json([
            'status' => $ok ? 'ok' : 'degraded',
            'checks' => $checks,
            'failed_jobs' => $failedJobs,
            'features' => $this->getSetting(self::FEATURES_KEY) ?: [],
            'at' => Carbon::now()->toIso8601String(),
        ]);
    }

    public function webhookRetryStub(Request $request): JsonResponse
    {
        $this->enableFeature('webhook_reliable');
        $failed = 0;
        $samples = [];
        if (Schema::hasTable('webhook_request_logs')) {
            $q = DB::table('webhook_request_logs');
            if (Schema::hasColumn('webhook_request_logs', 'status')) {
                $q->whereIn('status', ['failed', 'error', 'pending']);
            }
            $failed = (clone $q)->count();
            $samples = $q->orderByDesc('id')->limit(5)->get()->map(function ($row) {
                return [
                    'id' => $row->id ?? null,
                    'status' => $row->status ?? null,
                    'url' => $row->url ?? $row->endpoint ?? null,
                    'created_at' => $row->created_at ?? null,
                ];
            })->all();
        }
        $queue = $this->getSetting('faucon.webhook_retry_queue');
        if (!is_array($queue)) {
            $queue = [];
        }

        return response()->json([
            'mode' => 'stub_v1',
            'failed_or_pending_logs' => $failed,
            'retry_queue_depth' => count($queue),
            'retry_queue' => array_slice($queue, -10),
            'samples' => $samples,
            'note' => 'POST /webhooks/retry-enqueue para enfileirar; worker real com backoff fica para produção.',
        ]);
    }

    public function webhookRetryEnqueue(Request $request): JsonResponse
    {
        $this->enableFeature('webhook_reliable');
        $item = [
            'id' => (string) Str::uuid(),
            'log_id' => $request->input('log_id'),
            'url' => $request->input('url'),
            'attempts' => 0,
            'max_attempts' => 5,
            'next_attempt_at' => Carbon::now()->addMinutes(1)->toIso8601String(),
            'enqueued_at' => Carbon::now()->toIso8601String(),
            'status' => 'queued',
        ];
        $queue = $this->getSetting('faucon.webhook_retry_queue');
        if (!is_array($queue)) {
            $queue = [];
        }
        $queue[] = $item;
        $this->putSetting('faucon.webhook_retry_queue', array_slice($queue, -100));

        return response()->json(['enqueued' => true, 'item' => $item, 'depth' => count($queue)]);
    }

    /* ───────────── Platform stubs (OCR / RBAC / AO / what-if) ───────────── */

    public function ocrExtract(Request $request): JsonResponse
    {
        $this->enableFeature('ocr_documents');
        $text = (string) $request->input('text', '');
        $docType = (string) $request->input('type', 'guia_transporte');
        if ($text === '' && $request->filled('image_base64')) {
            $text = 'DOC_OCR_STUB';
        }
        if ($text === '') {
            return response()->error('Envie text ou image_base64.', 422);
        }

        $fields = [
            'document_type' => $docType,
            'reference' => preg_match('/\b([A-Z]{2,}-\d{4,})\b/', $text, $m) ? $m[1] : 'REF-STUB-' . strtoupper(Str::random(4)),
            'nif' => preg_match('/\b(\d{9})\b/', $text, $m) ? $m[1] : null,
            'plate' => preg_match('/\b([A-Z]{2}-\d{2}-[A-Z]{2})\b/i', $text, $m) ? strtoupper($m[1]) : null,
            'confidence' => 0.62,
            'engine' => 'faucon_ocr_stub_v1',
            'note' => 'Stub heurístico — ligar Tesseract/Document AI em produção.',
        ];

        return response()->json(['extracted' => $fields, 'raw_preview' => mb_substr($text, 0, 240)]);
    }

    public function rbacZones(Request $request): JsonResponse
    {
        $this->enableFeature('rbac_zone');
        $stored = $this->getSetting('faucon.rbac_zones');
        $zones = is_array($stored) ? $stored : [
            ['code' => 'LDA', 'name' => 'Luanda', 'roles' => ['dispatcher', 'ops_manager']],
            ['code' => 'BGO', 'name' => 'Benguela', 'roles' => ['dispatcher']],
            ['code' => 'HUA', 'name' => 'Huambo', 'roles' => ['dispatcher']],
        ];
        if ($request->isMethod('post')) {
            $zones = (array) $request->input('zones', $zones);
            $this->putSetting('faucon.rbac_zones', $zones);
        }
        $user = Auth::getUserFromSession($request);
        $audit = [
            'actor' => $user->uuid ?? null,
            'impersonation' => false,
            'note' => 'Audit de impersonation: registar em settings/audit log na v2.',
        ];

        return response()->json(['zones' => $zones, 'audit' => $audit]);
    }

    public function corridors(Request $request): JsonResponse
    {
        $this->enableFeature('corridor_mode');
        $corridors = [
            ['id' => 'ao-lda-bgo', 'from' => 'Luanda', 'to' => 'Benguela', 'km' => 710, 'eta_hours' => 10, 'risk' => 'medium'],
            ['id' => 'ao-lda-hua', 'from' => 'Luanda', 'to' => 'Huambo', 'km' => 600, 'eta_hours' => 9, 'risk' => 'medium'],
            ['id' => 'ao-lda-lob', 'from' => 'Luanda', 'to' => 'Lobito', 'km' => 490, 'eta_hours' => 7, 'risk' => 'low'],
            ['id' => 'ao-lda-mal', 'from' => 'Luanda', 'to' => 'Malanje', 'km' => 350, 'eta_hours' => 5, 'risk' => 'low'],
        ];

        return response()->json([
            'country' => 'AO',
            'corridors' => $corridors,
            'note' => 'Corredores angolanos de referência (stub). Integrar com rotas Valhalla/VROOM.',
        ]);
    }

    public function marketplace(Request $request): JsonResponse
    {
        $this->enableFeature('capacity_marketplace');
        $companyUuid = $this->companyUuid($request);
        $driversOnline = 0;
        if (Schema::hasTable('drivers')) {
            $q = DB::table('drivers')->whereNull('deleted_at');
            if ($companyUuid) {
                $q->where('company_uuid', $companyUuid);
            }
            if (Schema::hasColumn('drivers', 'online')) {
                $driversOnline = (clone $q)->where('online', 1)->count();
            } else {
                $driversOnline = $q->count();
            }
        }
        $offers = [
            [
                'id' => 'offer_stub_1',
                'type' => 'capacity_sell',
                'seats' => max(0, $driversOnline),
                'corridor' => 'ao-lda-bgo',
                'price_hint_aoa' => 85000,
                'status' => 'listed_stub',
            ],
        ];

        return response()->json([
            'offers' => $offers,
            'compliance' => [
                'license_check' => 'pending_manual',
                'insurance_check' => 'pending_manual',
                'note' => 'Compliance AO: checklist manual até integração AGT/INSS.',
            ],
        ]);
    }

    public function whatIf(Request $request): JsonResponse
    {
        $this->enableFeature('what_if_simulator');
        $companyUuid = $this->companyUuid($request);
        $removeDrivers = max(0, (int) $request->input('remove_drivers', 1));
        $extraOrders = max(0, (int) $request->input('extra_orders', 0));

        $active = 0;
        $drivers = 0;
        if (Schema::hasTable('orders')) {
            $oq = DB::table('orders')->whereNull('deleted_at')
                ->whereIn('status', ['dispatched', 'started', 'in_progress', 'en_route', 'active', 'assigned']);
            if ($companyUuid) {
                $oq->where('company_uuid', $companyUuid);
            }
            $active = $oq->count();
        }
        if (Schema::hasTable('drivers')) {
            $dq = DB::table('drivers')->whereNull('deleted_at');
            if ($companyUuid) {
                $dq->where('company_uuid', $companyUuid);
            }
            $drivers = $dq->count();
        }

        $available = max(0, $drivers - $removeDrivers);
        $load = $active + $extraOrders;
        $ratio = $available > 0 ? round($load / $available, 2) : null;
        $delayRisk = 'low';
        if ($available === 0) {
            $delayRisk = 'critical';
        } elseif ($ratio !== null && $ratio > 3) {
            $delayRisk = 'high';
        } elseif ($ratio !== null && $ratio > 1.5) {
            $delayRisk = 'medium';
        }

        return response()->json([
            'scenario' => [
                'remove_drivers' => $removeDrivers,
                'extra_orders' => $extraOrders,
            ],
            'baseline' => ['active_orders' => $active, 'drivers' => $drivers],
            'projected' => [
                'drivers_available' => $available,
                'orders_load' => $load,
                'orders_per_driver' => $ratio,
                'delay_risk' => $delayRisk,
            ],
            'note' => 'Simulador heurístico v1 — sem reoptimização VROOM.',
        ]);
    }

    public function environments(Request $request): JsonResponse
    {
        return response()->json([
            'current' => getenv('ENVIRONMENT') ?: config('app.env') ?: 'development',
            'app_name' => config('app.name') ?: 'Faucon',
            'app_url' => config('app.url') ?: getenv('APP_URL'),
            'console_host' => getenv('CONSOLE_HOST'),
            'debug' => (bool) (config('app.debug') ?? false),
            'recommended' => [
                'development' => ['APP_DEBUG' => true, 'MAIL_MAILER' => 'log'],
                'staging' => ['APP_DEBUG' => false, 'SENTRY_DSN' => 'required'],
                'production' => ['APP_DEBUG' => false, 'SENTRY_DSN' => 'required', 'HTTPS' => true],
            ],
            'note' => 'Perfis documentados; promoção staging/prod via compose/env separados.',
        ]);
    }

    /* ───────────── helpers ───────────── */

    private function podIsComplete(?array $pod): bool
    {
        if (!$pod) {
            return false;
        }
        if (!empty($pod['refused']) && !empty($pod['reason'])) {
            return true;
        }
        $hasPhoto = !empty($pod['photos']);
        $hasSig = !empty($pod['signature']);
        $otpOk = !empty($pod['otp_verified']) || (!empty($pod['otp']) && strlen((string) $pod['otp']) >= 4);

        return $hasPhoto && ($hasSig || $otpOk);
    }

    private function completionGate(object $order, ?string $companyUuid): array
    {
        $sla = $this->slaConfig($companyUuid);
        $meta = $this->decodeMeta($order->meta ?? null);
        $pod = $meta['faucon_pod'] ?? null;
        $podComplete = $this->podIsComplete(is_array($pod) ? $pod : null);
        $required = !empty($sla['pod_required_on_complete']) || (bool) ($order->pod_required ?? false);

        if (!$required) {
            return [
                'allowed' => true,
                'pod_required' => false,
                'pod_complete' => $podComplete,
                'reason' => null,
            ];
        }

        if ($podComplete) {
            return [
                'allowed' => true,
                'pod_required' => true,
                'pod_complete' => true,
                'reason' => null,
                'proof_uuid' => is_array($pod) ? ($pod['proof_uuid'] ?? null) : null,
            ];
        }

        return [
            'allowed' => false,
            'pod_required' => true,
            'pod_complete' => false,
            'reason' => 'POD obrigatório incompleto (foto + assinatura ou OTP, ou recusa com motivo).',
            'has_pod_meta' => !empty($pod),
        ];
    }

    private function slaConfig(?string $companyUuid): array
    {
        $defaults = [
            'delay_minutes' => 30,
            'pod_required_on_complete' => true,
            'alert_unassigned_after_minutes' => 15,
            'require_exception_reason' => true,
        ];
        $global = $this->getSetting('faucon.sla');
        $specific = $companyUuid ? $this->getSetting('faucon.sla.' . $companyUuid) : null;

        return array_merge($defaults, is_array($global) ? $global : [], is_array($specific) ? $specific : []);
    }

    private function ensureProofRecord(object $order, array $pod): ?string
    {
        if (!Schema::hasTable('proofs')) {
            return null;
        }
        if (!empty($pod['proof_uuid'])) {
            $existing = DB::table('proofs')->where('uuid', $pod['proof_uuid'])->whereNull('deleted_at')->first();
            if ($existing) {
                return $existing->uuid;
            }
        }

        $uuid = (string) Str::uuid();
        $publicId = 'proof_' . strtolower(Str::random(10));
        $remarks = $pod['recipient_name'] ?? null;
        if (!empty($pod['refused'])) {
            $remarks = trim('RECUSADO: ' . ($pod['reason'] ?? ''));
        }
        $row = [
            'uuid' => $uuid,
            'public_id' => $publicId,
            'order_uuid' => $order->uuid,
            'company_uuid' => $order->company_uuid ?? null,
            'remarks' => $remarks,
            'raw_data' => json_encode([
                'source' => 'faucon_pod',
                'photos' => $pod['photos'] ?? [],
                'signature' => $pod['signature'] ?? null,
                'otp_verified' => $pod['otp_verified'] ?? false,
                'checklist' => $pod['checklist'] ?? [],
                'captured_at' => $pod['captured_at'] ?? null,
            ]),
            'data' => json_encode($pod),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
        if (Schema::hasColumn('proofs', '_key')) {
            $row['_key'] = Str::random(16);
        }
        try {
            DB::table('proofs')->insert($row);
        } catch (\Throwable $e) {
            Log::warning('[faucon.pod.proof_insert_failed] ' . $e->getMessage());

            return null;
        }

        return $uuid;
    }

    private function estimateOrderCost(object $order): float
    {
        $rates = $this->costRates();
        $km = max(0, ((int) ($order->distance ?? 0)) / 1000) ?: 8;
        $hours = max(0, ((int) ($order->time ?? 0)) / 3600) ?: 0.5;
        $fuel = ($km / 100) * $rates['liters_per_100km'] * $rates['fuel_price_per_liter'];
        $driver = $hours * $rates['driver_cost_per_hour'];
        $maint = $km * $rates['maintenance_per_km'];

        return round($fuel + $driver + $maint, 2);
    }

    private function costRates(): array
    {
        return array_merge([
            'fuel_price_per_liter' => 800,
            'liters_per_100km' => 12,
            'driver_cost_per_hour' => 1500,
            'maintenance_per_km' => 25,
            'currency' => 'AOA',
        ], is_array($this->getSetting(self::COST_KEY)) ? $this->getSetting(self::COST_KEY) : []);
    }

    private function whatsappConfig(): array
    {
        return array_merge([
            'enabled' => false,
            'dry_run' => true,
            'phone_number_id' => '',
            'business_account_id' => '',
            'access_token' => '',
            'default_template_status' => 'order_status_pt',
        ], is_array($this->getSetting(self::WA_KEY)) ? $this->getSetting(self::WA_KEY) : []);
    }

    private function publicWhatsappConfig(): array
    {
        $c = $this->whatsappConfig();
        $c['access_token_set'] = !empty($c['access_token']);
        unset($c['access_token']);

        return $c;
    }

    private function paymentsConfig(): array
    {
        return array_merge([
            'enabled' => false,
            'provider' => 'multicaixa_express',
            'merchant_id' => '',
            'api_key' => '',
            'sandbox' => true,
            'currency' => 'AOA',
        ], is_array($this->getSetting(self::PAY_KEY)) ? $this->getSetting(self::PAY_KEY) : []);
    }

    private function publicPaymentsConfig(): array
    {
        $c = $this->paymentsConfig();
        $c['api_key_set'] = !empty($c['api_key']);
        unset($c['api_key']);

        return $c;
    }

    private function enableFeature(string $key): void
    {
        $features = array_merge([], is_array($this->getSetting(self::FEATURES_KEY)) ? $this->getSetting(self::FEATURES_KEY) : []);
        if (!empty($features[$key])) {
            return;
        }
        $features[$key] = true;
        $this->putSetting(self::FEATURES_KEY, $features);
    }

    private function companyUuid(Request $request): ?string
    {
        $fromRequest = $request->input('company_uuid') ?: $request->header('X-Company-Uuid');
        if ($fromRequest) {
            return (string) $fromRequest;
        }
        try {
            $session = Auth::getCompanySession() ?? Auth::getCompany();
            if ($session && isset($session->uuid)) {
                return $session->uuid;
            }
        } catch (\Throwable $e) {
        }
        $user = Auth::getUserFromSession($request);
        if ($user && !empty($user->company_uuid)) {
            return $user->company_uuid;
        }

        return null;
    }

    private function findOrder(string $uuid, ?string $companyUuid)
    {
        $q = DB::table('orders')->where('uuid', $uuid)->whereNull('deleted_at');
        if ($companyUuid) {
            $q->where('company_uuid', $companyUuid);
        }

        return $q->first();
    }

    private function decodeMeta($meta): array
    {
        if (is_array($meta)) {
            return $meta;
        }
        if (is_string($meta) && $meta !== '') {
            $decoded = json_decode($meta, true);

            return is_array($decoded) ? $decoded : [];
        }

        return [];
    }

    private function getSetting(string $key)
    {
        if (!Schema::hasTable('settings')) {
            return null;
        }
        $row = DB::table('settings')->where('key', $key)->first();
        if (!$row) {
            return null;
        }
        $value = $row->value ?? null;
        if (is_string($value)) {
            $decoded = json_decode($value, true);

            return json_last_error() === JSON_ERROR_NONE ? $decoded : $value;
        }

        return $value;
    }

    private function putSetting(string $key, $value): void
    {
        if (!Schema::hasTable('settings')) {
            return;
        }
        $encoded = json_encode($value);
        if (DB::table('settings')->where('key', $key)->exists()) {
            DB::table('settings')->where('key', $key)->update(['value' => $encoded]);
        } else {
            DB::table('settings')->insert(['key' => $key, 'value' => $encoded]);
        }
    }
}

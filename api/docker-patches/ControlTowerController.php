<?php

namespace Fleetbase\Http\Controllers\Internal\v1;

use Fleetbase\Http\Controllers\Controller;
use Fleetbase\Models\Company;
use Fleetbase\Support\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Faucon Control Tower — operational summary, SLA exceptions, feature flags.
 */
class ControlTowerController extends Controller
{
    private const SLA_KEY = 'faucon.sla';
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

    public function summary(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $sla = $this->slaConfig($companyUuid);
        $delayMinutes = (int) ($sla['delay_minutes'] ?? 30);
        $now = Carbon::now();
        $cutoff = $now->copy()->subMinutes($delayMinutes);

        $orders = $this->ordersQuery($companyUuid);
        $activeStatuses = $this->activeOrderStatuses();

        $active = (clone $orders)->whereIn('status', $activeStatuses)->count();
        $unassigned = (clone $orders)->whereIn('status', $activeStatuses)
            ->where(function ($q) {
                $q->whereNull('driver_assigned_uuid')->orWhere('driver_assigned_uuid', '');
            })->count();

        $delayed = (clone $orders)->whereIn('status', $activeStatuses)
            ->where(function ($q) use ($cutoff, $now) {
                $q->where(function ($q2) use ($cutoff) {
                    $q2->whereNotNull('scheduled_at')->where('scheduled_at', '<', $cutoff);
                })->orWhere(function ($q2) use ($now) {
                    $q2->whereNotNull('time_window_end')->where('time_window_end', '<', $now);
                })->orWhere(function ($q2) use ($cutoff) {
                    $q2->whereNull('scheduled_at')
                        ->whereNull('time_window_end')
                        ->where('dispatched', 1)
                        ->where('dispatched_at', '<', $cutoff);
                });
            })->count();

        $completedToday = (clone $orders)
            ->whereIn('status', ['completed', 'complete', 'delivered'])
            ->whereDate('updated_at', $now->toDateString())
            ->count();

        $vehiclesOnline = 0;
        $vehiclesTotal = 0;
        if (Schema::hasTable('vehicles')) {
            $vq = DB::table('vehicles')->whereNull('deleted_at');
            if ($companyUuid) {
                $vq->where('company_uuid', $companyUuid);
            }
            $vehiclesTotal = (clone $vq)->count();
            if (Schema::hasColumn('vehicles', 'online')) {
                $vehiclesOnline = (clone $vq)->where('online', 1)->count();
            }
        }

        $driversOnline = 0;
        $driversTotal = 0;
        if (Schema::hasTable('drivers')) {
            $dq = DB::table('drivers')->whereNull('deleted_at');
            if ($companyUuid) {
                $dq->where('company_uuid', $companyUuid);
            }
            $driversTotal = (clone $dq)->count();
            if (Schema::hasColumn('drivers', 'online')) {
                $driversOnline = (clone $dq)->where('online', 1)->count();
            }
        }

        $openIssues = 0;
        if (Schema::hasTable('issues')) {
            $iq = DB::table('issues')->whereNull('deleted_at');
            if ($companyUuid) {
                $iq->where('company_uuid', $companyUuid);
            }
            if (Schema::hasColumn('issues', 'status')) {
                $iq->whereNotIn('status', ['resolved', 'closed', 'cancelled', 'canceled']);
            }
            $openIssues = $iq->count();
        }

        return response()->json([
            'generated_at' => $now->toIso8601String(),
            'company_uuid' => $companyUuid,
            'sla' => $sla,
            'kpis' => [
                'orders_active' => $active,
                'orders_delayed' => $delayed,
                'orders_unassigned' => $unassigned,
                'orders_completed_today' => $completedToday,
                'vehicles_online' => $vehiclesOnline,
                'vehicles_total' => $vehiclesTotal,
                'drivers_online' => $driversOnline,
                'drivers_total' => $driversTotal,
                'issues_open' => $openIssues,
            ],
            'health' => [
                'level' => $delayed > 0 || $openIssues > 5 ? 'warning' : ($unassigned > 10 ? 'attention' : 'ok'),
                'messages' => array_values(array_filter([
                    $delayed > 0 ? "{$delayed} encomenda(s) fora do SLA ({$delayMinutes} min)" : null,
                    $unassigned > 0 ? "{$unassigned} encomenda(s) sem motorista" : null,
                    $openIssues > 0 ? "{$openIssues} problema(s) aberto(s)" : null,
                    $vehiclesTotal > 0 && $vehiclesOnline === 0 ? 'Nenhum veículo online' : null,
                ])),
            ],
        ]);
    }

    public function exceptions(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $sla = $this->slaConfig($companyUuid);
        $delayMinutes = (int) ($sla['delay_minutes'] ?? 30);
        $now = Carbon::now();
        $cutoff = $now->copy()->subMinutes($delayMinutes);
        $limit = min(100, max(1, (int) $request->input('limit', 40)));

        $items = [];

        if (Schema::hasTable('orders')) {
            $q = $this->ordersQuery($companyUuid)
                ->whereIn('status', $this->activeOrderStatuses())
                ->where(function ($q) use ($cutoff, $now) {
                    $q->where(function ($q2) use ($cutoff) {
                        $q2->whereNotNull('scheduled_at')->where('scheduled_at', '<', $cutoff);
                    })->orWhere(function ($q2) use ($now) {
                        $q2->whereNotNull('time_window_end')->where('time_window_end', '<', $now);
                    })->orWhere(function ($q2) use ($cutoff) {
                        $q2->whereNull('scheduled_at')
                            ->whereNull('time_window_end')
                            ->where('dispatched', 1)
                            ->where('dispatched_at', '<', $cutoff);
                    });
                })
                ->orderByRaw('COALESCE(scheduled_at, time_window_end, dispatched_at, created_at) ASC')
                ->limit($limit);

            foreach ($q->get(['uuid', 'public_id', 'status', 'scheduled_at', 'time_window_end', 'dispatched_at', 'driver_assigned_uuid', 'pod_required']) as $row) {
                $items[] = [
                    'type' => 'order_delayed',
                    'severity' => 'high',
                    'title' => 'Encomenda fora do SLA',
                    'ref' => $row->public_id ?: $row->uuid,
                    'uuid' => $row->uuid,
                    'status' => $row->status,
                    'scheduled_at' => $row->scheduled_at,
                    'driver_assigned' => !empty($row->driver_assigned_uuid),
                    'pod_required' => (bool) $row->pod_required,
                ];
            }

            $unassigned = $this->ordersQuery($companyUuid)
                ->whereIn('status', $this->activeOrderStatuses())
                ->where(function ($q) {
                    $q->whereNull('driver_assigned_uuid')->orWhere('driver_assigned_uuid', '');
                })
                ->orderByDesc('created_at')
                ->limit($limit)
                ->get(['uuid', 'public_id', 'status', 'created_at']);

            foreach ($unassigned as $row) {
                $items[] = [
                    'type' => 'order_unassigned',
                    'severity' => 'medium',
                    'title' => 'Encomenda sem motorista',
                    'ref' => $row->public_id ?: $row->uuid,
                    'uuid' => $row->uuid,
                    'status' => $row->status,
                    'created_at' => $row->created_at,
                ];
            }
        }

        if (Schema::hasTable('issues')) {
            $iq = DB::table('issues')->whereNull('deleted_at');
            if ($companyUuid) {
                $iq->where('company_uuid', $companyUuid);
            }
            if (Schema::hasColumn('issues', 'status')) {
                $iq->whereNotIn('status', ['resolved', 'closed', 'cancelled', 'canceled']);
            }
            foreach ($iq->orderByDesc('created_at')->limit(20)->get() as $row) {
                $items[] = [
                    'type' => 'issue_open',
                    'severity' => 'medium',
                    'title' => 'Problema aberto',
                    'ref' => $row->public_id ?? $row->uuid ?? (string) $row->id,
                    'uuid' => $row->uuid ?? null,
                    'status' => $row->status ?? null,
                    'created_at' => $row->created_at ?? null,
                ];
            }
        }

        if (!empty($sla['pod_required_on_complete']) && Schema::hasTable('orders')) {
            $podWatch = $this->ordersQuery($companyUuid)
                ->whereIn('status', array_merge($this->activeOrderStatuses(), ['completed', 'complete', 'delivered']))
                ->orderByDesc('updated_at')
                ->limit(40)
                ->get(['uuid', 'public_id', 'status', 'pod_required', 'meta']);
            $podMissing = 0;
            foreach ($podWatch as $row) {
                $meta = $this->decodeMeta($row->meta ?? null);
                $pod = $meta['faucon_pod'] ?? null;
                $needs = !empty($sla['pod_required_on_complete']) || (bool) ($row->pod_required ?? false);
                if (!$needs) {
                    continue;
                }
                if ($this->podIsComplete(is_array($pod) ? $pod : null)) {
                    continue;
                }
                $isDone = in_array($row->status, ['completed', 'complete', 'delivered'], true);
                $items[] = [
                    'type' => $isDone ? 'pod_missing_on_complete' : 'pod_incomplete',
                    'severity' => $isDone ? 'high' : 'medium',
                    'title' => $isDone ? 'Concluído sem POD completo' : 'POD incompleto / em falta',
                    'ref' => $row->public_id ?: $row->uuid,
                    'uuid' => $row->uuid,
                    'status' => $row->status,
                ];
                if (++$podMissing >= 15) {
                    break;
                }
            }
        }

        usort($items, function ($a, $b) {
            $rank = ['high' => 0, 'medium' => 1, 'low' => 2];

            return ($rank[$a['severity']] ?? 9) <=> ($rank[$b['severity']] ?? 9);
        });

        return response()->json([
            'generated_at' => $now->toIso8601String(),
            'count' => count($items),
            'exceptions' => array_slice($items, 0, $limit),
        ]);
    }

    public function getSla(Request $request): JsonResponse
    {
        return response()->json(['sla' => $this->slaConfig($this->companyUuid($request))]);
    }

    public function saveSla(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $payload = [
            'delay_minutes' => max(5, min(24 * 60, (int) $request->input('delay_minutes', 30))),
            'pod_required_on_complete' => (bool) $request->input('pod_required_on_complete', true),
            'alert_unassigned_after_minutes' => max(5, min(24 * 60, (int) $request->input('alert_unassigned_after_minutes', 15))),
            'require_exception_reason' => (bool) $request->input('require_exception_reason', true),
        ];
        $this->putSetting($this->slaKey($companyUuid), $payload);

        return response()->json(['sla' => $payload, 'saved' => true]);
    }

    public function getFeatures(Request $request): JsonResponse
    {
        return response()->json(['features' => $this->featuresConfig()]);
    }

    public function saveFeatures(Request $request): JsonResponse
    {
        $user = Auth::getUserFromSession($request);
        if (!$user || !method_exists($user, 'isAdmin') || !$user->isAdmin()) {
            return response()->error('Only system administrators can update feature flags.', 403);
        }
        $incoming = $request->input('features', []);
        if (!is_array($incoming)) {
            return response()->error('features must be an object', 422);
        }
        $merged = array_merge($this->defaultFeatures(), $this->featuresConfig(), $incoming);
        $this->putSetting(self::FEATURES_KEY, $merged);

        return response()->json(['features' => $merged, 'saved' => true]);
    }

    public function assignmentSuggest(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $limit = min(20, max(1, (int) $request->input('limit', 10)));

        $orders = [];
        if (Schema::hasTable('orders')) {
            $orders = $this->ordersQuery($companyUuid)
                ->whereIn('status', $this->activeOrderStatuses())
                ->where(function ($q) {
                    $q->whereNull('driver_assigned_uuid')->orWhere('driver_assigned_uuid', '');
                })
                ->orderByDesc('orchestrator_priority')
                ->orderBy('created_at')
                ->limit($limit)
                ->get(['uuid', 'public_id', 'status', 'orchestrator_priority', 'required_skills']);
        }

        $drivers = collect();
        if (Schema::hasTable('drivers')) {
            $dq = DB::table('drivers')->whereNull('deleted_at');
            if ($companyUuid) {
                $dq->where('company_uuid', $companyUuid);
            }
            if (Schema::hasColumn('drivers', 'online')) {
                $dq->where('online', 1);
            }
            if (Schema::hasColumn('drivers', 'status')) {
                $dq->where(function ($q) {
                    $q->whereNull('status')->orWhereIn('status', ['active', 'available', 'online']);
                });
            }
            $cols = ['uuid', 'public_id', 'status', 'online', 'slug'];
            $drivers = $dq->limit(50)->get($cols);
        }

        $suggestions = [];
        $driverList = $drivers->values();
        $i = 0;
        foreach ($orders as $order) {
            $driver = $driverList->count() ? $driverList->get($i % $driverList->count()) : null;
            $i++;
            $suggestions[] = [
                'order_uuid' => $order->uuid,
                'order_id' => $order->public_id,
                'suggested_driver_uuid' => $driver->uuid ?? null,
                'suggested_driver' => $driver->public_id ?? ($driver->slug ?? null),
                'score' => $driver ? 70 : 0,
                'reason' => $driver
                    ? 'Stub v1: motorista online disponível (próximo incremento: distância + skills + carga)'
                    : 'Sem motoristas online para sugerir',
                'requires_confirmation' => true,
            ];
        }

        return response()->json([
            'mode' => 'stub_v1',
            'count' => count($suggestions),
            'suggestions' => $suggestions,
            'note' => 'Atribuição automática só após confirmação humana (auditoria).',
        ]);
    }

    public function plannedVsActual(Request $request): JsonResponse
    {
        $companyUuid = $this->companyUuid($request);
        $limit = max(1, min(50, (int) $request->input('limit', 25)));
        $now = Carbon::now();

        $rows = $this->ordersQuery($companyUuid)
            ->where(function ($q) {
                $q->whereNotNull('scheduled_at')
                    ->orWhereNotNull('time_window_end')
                    ->orWhereNotNull('distance')
                    ->orWhereNotNull('route_uuid');
            })
            ->orderByDesc('updated_at')
            ->limit($limit)
            ->get([
                'uuid', 'public_id', 'status', 'distance', 'time', 'route_uuid',
                'scheduled_at', 'started_at', 'dispatched_at', 'time_window_start', 'time_window_end', 'updated_at',
            ]);

        $comparisons = [];
        $varianceSum = 0;
        $varianceN = 0;
        foreach ($rows as $row) {
            $plannedDistanceM = (int) ($row->distance ?? 0);
            $plannedTimeS = (int) ($row->time ?? 0);
            $routeDistanceM = null;
            $routeTimeS = null;
            if (!empty($row->route_uuid) && Schema::hasTable('routes')) {
                $route = DB::table('routes')->where('uuid', $row->route_uuid)->whereNull('deleted_at')->first();
                if ($route) {
                    $routeDistanceM = isset($route->total_distance) ? (int) $route->total_distance : null;
                    $routeTimeS = isset($route->total_time) ? (int) $route->total_time : null;
                    if ($routeDistanceM) {
                        $plannedDistanceM = $routeDistanceM;
                    }
                    if ($routeTimeS) {
                        $plannedTimeS = $routeTimeS;
                    }
                }
            }

            $start = $row->started_at ?: $row->dispatched_at;
            $end = in_array($row->status, ['completed', 'complete', 'delivered'], true)
                ? ($row->updated_at ?: $now)
                : null;
            $actualTimeS = null;
            if ($start && $end) {
                try {
                    $actualTimeS = max(0, Carbon::parse($start)->diffInSeconds(Carbon::parse($end)));
                } catch (\Throwable $e) {
                    $actualTimeS = null;
                }
            }

            $windowEnd = $row->time_window_end ?: $row->scheduled_at;
            $lateSeconds = null;
            $deadline = $end ?: $now;
            if ($windowEnd) {
                try {
                    $lateSeconds = Carbon::parse($windowEnd)->diffInSeconds(Carbon::parse($deadline), false);
                } catch (\Throwable $e) {
                    $lateSeconds = null;
                }
            }

            $timeVariancePct = null;
            if ($plannedTimeS > 0 && $actualTimeS !== null) {
                $timeVariancePct = round((($actualTimeS - $plannedTimeS) / $plannedTimeS) * 100, 1);
                $varianceSum += $timeVariancePct;
                $varianceN++;
            }

            $distanceVariancePct = null;
            if ($plannedDistanceM > 0 && $routeDistanceM && $row->distance) {
                $distanceVariancePct = round((((int) $row->distance - $plannedDistanceM) / $plannedDistanceM) * 100, 1);
            }

            $status = 'on_track';
            if ($lateSeconds !== null && $lateSeconds > 0) {
                $status = 'late';
            } elseif ($timeVariancePct !== null && $timeVariancePct > 25) {
                $status = 'overrun';
            } elseif ($timeVariancePct !== null && $timeVariancePct < -25) {
                $status = 'ahead';
            }

            $comparisons[] = [
                'uuid' => $row->uuid,
                'public_id' => $row->public_id,
                'order_status' => $row->status,
                'comparison_status' => $status,
                'planned_distance_m' => $plannedDistanceM ?: null,
                'planned_time_s' => $plannedTimeS ?: null,
                'actual_time_s' => $actualTimeS,
                'late_seconds' => $lateSeconds,
                'time_variance_pct' => $timeVariancePct,
                'distance_variance_pct' => $distanceVariancePct,
                'window_end' => $windowEnd,
                'has_route' => !empty($row->route_uuid),
            ];
        }

        $features = $this->featuresConfig();
        if (empty($features['planned_vs_actual'])) {
            $features['planned_vs_actual'] = true;
            $this->putSetting(self::FEATURES_KEY, $features);
        }

        return response()->json([
            'status' => 'ok',
            'count' => count($comparisons),
            'avg_time_variance_pct' => $varianceN ? round($varianceSum / $varianceN, 1) : null,
            'comparisons' => $comparisons,
            'note' => 'Heurística v1: janela/agendamento + duração real; distância de rota quando route_uuid existe. Telemática GPS em incremento futuro.',
        ]);
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

    private function ordersQuery(?string $companyUuid)
    {
        $q = DB::table('orders')->whereNull('deleted_at');
        if ($companyUuid) {
            $q->where('company_uuid', $companyUuid);
        }

        return $q;
    }

    private function activeOrderStatuses(): array
    {
        return [
            'created', 'pending', 'dispatched', 'assigned', 'started', 'in_progress',
            'en_route', 'active', 'driver_enroute', 'driver_assigned', 'preparing',
        ];
    }

    private function slaKey(?string $companyUuid): string
    {
        return $companyUuid ? self::SLA_KEY . '.' . $companyUuid : self::SLA_KEY;
    }

    private function slaConfig(?string $companyUuid): array
    {
        $defaults = [
            'delay_minutes' => 30,
            'pod_required_on_complete' => true,
            'alert_unassigned_after_minutes' => 15,
            'require_exception_reason' => true,
        ];
        $specific = $this->getSetting($this->slaKey($companyUuid));
        $global = $this->getSetting(self::SLA_KEY);

        return array_merge($defaults, is_array($global) ? $global : [], is_array($specific) ? $specific : []);
    }

    private function defaultFeatures(): array
    {
        return [
            'control_tower' => true,
            'sla_exceptions' => true,
            'assignment_suggest' => true,
            'pod_advanced' => true,
            'planned_vs_actual' => true,
            'cost_per_delivery' => true,
            'auto_invoicing' => true,
            'driver_settlement' => true,
            'payments_local' => true,
            'dispatch_copilot' => true,
            'delay_prediction' => true,
            'ocr_documents' => true,
            'anomaly_detection' => true,
            'public_tracking_plus' => true,
            'whatsapp_business' => true,
            'driver_app_offline' => false,
            'observability_sentry' => true,
            'webhook_reliable' => true,
            'rbac_zone' => true,
            'corridor_mode' => true,
            'capacity_marketplace' => true,
            'what_if_simulator' => true,
        ];
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

    private function featuresConfig(): array
    {
        $stored = $this->getSetting(self::FEATURES_KEY);

        return array_merge($this->defaultFeatures(), is_array($stored) ? $stored : []);
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
        $exists = DB::table('settings')->where('key', $key)->exists();
        if ($exists) {
            DB::table('settings')->where('key', $key)->update(['value' => $encoded]);
        } else {
            DB::table('settings')->insert(['key' => $key, 'value' => $encoded]);
        }
    }
}

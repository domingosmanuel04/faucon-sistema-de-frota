<?php

namespace Fleetbase\FleetOps\Http\Controllers\Internal\v1;

use Fleetbase\FleetOps\Flow\Activity;
use Fleetbase\FleetOps\Support\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Faucon: enforce meta faucon_pod on completing activities; reuse proof_uuid when present.
 */
class FauconOrderController extends OrderController
{
    public function updateActivity(string $id, Request $request)
    {
        $order = $this->findOrderById($id);
        if (!$order) {
            return response()->error('No order found.');
        }

        $activityPayload = $request->array('activity');
        $activity        = new Activity($activityPayload, $order->getConfigFlow());
        $orderConfig     = $order->config();
        if ($orderConfig && $orderConfig->hasStrictTransitions()) {
            $targetCode = $activity->get('code');
            $configured = $targetCode ? $orderConfig->getActivityByCode($targetCode) : null;
            if ($configured) {
                $activity = $configured;
            }
        }

        $completing = Utils::isActivity($activity) && $activity->completesOrder();
        $sla        = $this->fauconSlaConfig($order->company_uuid ?? null);
        $meta       = $this->fauconDecodeMeta($order->meta ?? null);
        $pod        = is_array($meta['faucon_pod'] ?? null) ? $meta['faucon_pod'] : null;
        $podOk      = $this->fauconPodIsComplete($pod);
        $required   = !empty($sla['pod_required_on_complete']) || (bool) ($order->pod_required ?? false);

        if ($completing && $required && !$request->boolean('bypass_proof')) {
            if (!$podOk) {
                return response()->error(
                    'POD Faucon obrigatório incompleto (foto + assinatura ou OTP, ou recusa com motivo). Guarde o POD na Torre ou envie proof.',
                    422
                );
            }
            if (!$request->filled('proof') && !empty($pod['proof_uuid'])) {
                $request->merge(['proof' => $pod['proof_uuid']]);
            }
        }

        return parent::updateActivity($id, $request);
    }

    public function nextActivity(string $id, Request $request)
    {
        $response = parent::nextActivity($id, $request);
        $order    = $this->findOrderById($id);
        if (!$order || !method_exists($response, 'getData')) {
            return $response;
        }

        $sla      = $this->fauconSlaConfig($order->company_uuid ?? null);
        $required = !empty($sla['pod_required_on_complete']) || (bool) ($order->pod_required ?? false);
        if (!$required) {
            return $response;
        }

        $meta = $this->fauconDecodeMeta($order->meta ?? null);
        $pod  = is_array($meta['faucon_pod'] ?? null) ? $meta['faucon_pod'] : null;
        $podOk = $this->fauconPodIsComplete($pod);

        $data = $response->getData(true);
        if (!is_array($data)) {
            return $response;
        }

        $mapped = [];
        foreach ($data as $item) {
            if (!is_array($item)) {
                $mapped[] = $item;
                continue;
            }
            $completes = !empty($item['complete'])
                || !empty($item['completes'])
                || (($item['code'] ?? '') === 'completed')
                || (($item['code'] ?? '') === 'complete');
            if ($completes) {
                $item['require_pod'] = true;
                $item['pod_method'] = $order->pod_method ?: 'photo_signature_otp';
                $item['faucon_pod_complete'] = $podOk;
                $item['faucon_proof_uuid'] = $pod['proof_uuid'] ?? null;
            }
            $mapped[] = $item;
        }

        return response()->json($mapped);
    }

    private function fauconSlaConfig(?string $companyUuid): array
    {
        $defaults = [
            'pod_required_on_complete' => true,
        ];
        if (!Schema::hasTable('settings')) {
            return $defaults;
        }
        $merge = function (?string $key) {
            if (!$key) {
                return [];
            }
            $row = DB::table('settings')->where('key', $key)->first();
            if (!$row || !isset($row->value)) {
                return [];
            }
            $value = $row->value;
            if (is_string($value)) {
                $decoded = json_decode($value, true);

                return is_array($decoded) ? $decoded : [];
            }

            return is_array($value) ? $value : [];
        };

        return array_merge($defaults, $merge('faucon.sla'), $companyUuid ? $merge('faucon.sla.' . $companyUuid) : []);
    }

    private function fauconDecodeMeta($meta): array
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

    private function fauconPodIsComplete(?array $pod): bool
    {
        if (!$pod) {
            return false;
        }
        if (!empty($pod['refused']) && !empty($pod['reason'])) {
            return true;
        }
        $hasPhoto = !empty($pod['photos']);
        $hasSig   = !empty($pod['signature']);
        $otpOk    = !empty($pod['otp_verified']) || (!empty($pod['otp']) && strlen((string) $pod['otp']) >= 4);

        return $hasPhoto && ($hasSig || $otpOk);
    }
}

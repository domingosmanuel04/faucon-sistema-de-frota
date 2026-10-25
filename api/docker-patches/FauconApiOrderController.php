<?php

namespace Fleetbase\FleetOps\Http\Controllers\Api\v1;

use Fleetbase\FleetOps\Flow\Activity;
use Fleetbase\FleetOps\Support\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Faucon POD gate for public/driver API update-activity + complete.
 */
class FauconApiOrderController extends OrderController
{
    public function updateActivity($id, Request $request)
    {
        $blocked = $this->fauconBlockIfNeeded($id, $request, true);
        if ($blocked !== null) {
            return $blocked;
        }

        return parent::updateActivity($id, $request);
    }

    public function completeOrder(string $id)
    {
        $request = request();
        $blocked = $this->fauconBlockIfNeeded($id, $request, false);
        if ($blocked !== null) {
            return $blocked;
        }

        return parent::completeOrder($id);
    }

    private function fauconBlockIfNeeded($id, Request $request, bool $onlyIfCompleting)
    {
        try {
            $order = $id instanceof \Fleetbase\FleetOps\Models\Order
                ? $id
                : $this->findOrder($id);
        } catch (\Throwable $e) {
            return null;
        }
        if (!$order) {
            return null;
        }

        $completing = true;
        if ($onlyIfCompleting) {
            $activityPayload = $request->array('activity');
            $activity        = Utils::isActivity($activityPayload)
                ? $activityPayload
                : new Activity($activityPayload, $order->getConfigFlow());
            $completing = Utils::isActivity($activity) && $activity->completesOrder();
        }

        if (!$completing) {
            return null;
        }

        $sla      = $this->fauconSlaConfig($order->company_uuid ?? null);
        $required = !empty($sla['pod_required_on_complete']) || (bool) ($order->pod_required ?? false);
        if (!$required || $request->boolean('bypass_proof')) {
            return null;
        }

        $meta = $this->fauconDecodeMeta($order->meta ?? null);
        $pod  = is_array($meta['faucon_pod'] ?? null) ? $meta['faucon_pod'] : null;
        if ($this->fauconPodIsComplete($pod)) {
            if (!$request->filled('proof') && !empty($pod['proof_uuid'])) {
                $request->merge(['proof' => $pod['proof_uuid']]);
            }

            return null;
        }

        return response()->apiError(
            'POD Faucon obrigatório incompleto (foto + assinatura ou OTP, ou recusa com motivo).',
            422
        );
    }

    private function fauconSlaConfig(?string $companyUuid): array
    {
        $defaults = ['pod_required_on_complete' => true];
        if (!Schema::hasTable('settings')) {
            return $defaults;
        }
        $read = function (string $key) {
            $row = DB::table('settings')->where('key', $key)->first();
            if (!$row) {
                return [];
            }
            $value = $row->value ?? null;
            if (is_string($value)) {
                $decoded = json_decode($value, true);

                return is_array($decoded) ? $decoded : [];
            }

            return is_array($value) ? $value : [];
        };

        return array_merge($defaults, $read('faucon.sla'), $companyUuid ? $read('faucon.sla.' . $companyUuid) : []);
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

        return !empty($pod['photos']) && (
            !empty($pod['signature'])
            || !empty($pod['otp_verified'])
            || (!empty($pod['otp']) && strlen((string) $pod['otp']) >= 4)
        );
    }
}

<?php
/**
 * Garante roles EN esperados pelo FleetOps quando a BD só tem nomes PT.
 * Executar: php artisan tinker --execute="require 'docker-patches/seed-fleetops-en-roles.php';"
 */
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

$map = [
    'Fleet-Ops Contact' => 'Contacto Fleet-Ops',
    'Fleet-Ops Customer' => 'Cliente Fleet-Ops',
];

foreach ($map as $en => $pt) {
    $exists = DB::table('roles')->where('name', $en)->where('guard_name', 'sanctum')->exists();
    if ($exists) {
        echo "EXISTS {$en}\n";
        continue;
    }
    $src = DB::table('roles')->where('name', $pt)->where('guard_name', 'sanctum')->first();
    $id = (string) Str::uuid();
    DB::table('roles')->insert([
        'id' => $id,
        'company_uuid' => $src->company_uuid ?? null,
        'name' => $en,
        'guard_name' => 'sanctum',
        'service' => $src->service ?? 'fleet-ops',
        'description' => (($src->description ?? $en) . ' (alias EN)'),
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    if ($src) {
        foreach (DB::table('role_has_permissions')->where('role_id', $src->id)->get() as $p) {
            DB::table('role_has_permissions')->insertOrIgnore([
                'permission_id' => $p->permission_id,
                'role_id' => $id,
            ]);
        }
    }
    echo "CREATED {$en}\n";
}

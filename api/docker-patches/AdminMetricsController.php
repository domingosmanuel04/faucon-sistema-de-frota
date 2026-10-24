<?php

namespace Fleetbase\Http\Controllers\Internal\v1;

use Fleetbase\Http\Controllers\Controller;
use Fleetbase\Models\Activity;
use Fleetbase\Models\Company;
use Fleetbase\Models\User;
use Fleetbase\Support\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AdminMetricsController extends Controller
{
    public function __construct()
    {
        // Platform-wide figures: system administrators only.
        $this->middleware(function ($request, $next) {
            if (!Auth::getUserFromSession($request)?->isAdmin()) {
                return response()->error('Only system administrators can view platform metrics.', 401);
            }

            return $next($request);
        });
    }

    public function kpi(Request $request, string $slug): JsonResponse
    {
        [$currentPeriodStart, $previousPeriodStart] = $this->periodBoundaries();

        $metric = match ($slug) {
            'users-total' => $this->makeKpiMetric(
                'Users',
                User::query()->count(),
                User::where('created_at', '>=', $currentPeriodStart)->count(),
                User::whereBetween('created_at', [$previousPeriodStart, $currentPeriodStart])->count(),
                'users'
            ),
            'organizations-total' => $this->makeKpiMetric(
                'Organizations',
                Company::query()->count(),
                Company::where('created_at', '>=', $currentPeriodStart)->count(),
                Company::whereBetween('created_at', [$previousPeriodStart, $currentPeriodStart])->count(),
                'building'
            ),
            'active-admins' => $this->makeKpiMetric(
                'Active Admins',
                User::where('type', 'admin')->where(function ($query) {
                    $query->whereNull('status')->orWhere('status', 'active');
                })->count(),
                User::where('type', 'admin')->where('created_at', '>=', $currentPeriodStart)->count(),
                User::where('type', 'admin')->whereBetween('created_at', [$previousPeriodStart, $currentPeriodStart])->count(),
                'user-shield'
            ),
            'organizations-attention' => $this->makeKpiMetric(
                'Pending Attention',
                $this->organizationsAttentionCount(),
                Company::where('created_at', '>=', $currentPeriodStart)->whereNull('onboarding_completed_at')->count(),
                Company::whereBetween('created_at', [$previousPeriodStart, $currentPeriodStart])->whereNull('onboarding_completed_at')->count(),
                'building-circle-exclamation',
                $this->organizationsAttentionCount() > 0 ? 'warning' : 'success'
            ),
            'new-users' => $this->makeKpiMetric(
                'New Users',
                User::where('created_at', '>=', $currentPeriodStart)->count(),
                User::where('created_at', '>=', $currentPeriodStart)->count(),
                User::whereBetween('created_at', [$previousPeriodStart, $currentPeriodStart])->count(),
                'user-plus'
            ),
            'new-organizations' => $this->makeKpiMetric(
                'New Organizations',
                Company::where('created_at', '>=', $currentPeriodStart)->count(),
                Company::where('created_at', '>=', $currentPeriodStart)->count(),
                Company::whereBetween('created_at', [$previousPeriodStart, $currentPeriodStart])->count(),
                'building-circle-check'
            ),
            'failed-jobs' => $this->makeKpiMetric(
                'Failed Jobs',
                $this->failedJobsCount(),
                $this->failedJobsCount($currentPeriodStart),
                $this->failedJobsCount($previousPeriodStart, $currentPeriodStart),
                'triangle-exclamation',
                $this->failedJobsCount() > 0 ? 'danger' : 'success'
            ),
            'suspicious-activity' => $this->makeKpiMetric(
                'Suspicious Activity',
                $this->sensitiveActivityCount($currentPeriodStart),
                $this->sensitiveActivityCount($currentPeriodStart),
                $this->sensitiveActivityCount($previousPeriodStart, $currentPeriodStart),
                'shield-halved',
                $this->sensitiveActivityCount($currentPeriodStart) > 0 ? 'warning' : 'success'
            ),
            default => null,
        };

        if ($metric === null) {
            return response()->json(['error' => 'Unknown admin metric.'], 404);
        }

        return response()->json($metric);
    }

    public function widget(Request $request, string $widget): JsonResponse
    {
        $summary = match ($widget) {
            'system-diagnostics'      => $this->systemDiagnosticsSummary(),
            'admin-activity'          => $this->adminActivitySummary(),
            'organization-risk-queue' => $this->organizationRiskQueueSummary(),
            'configuration-gaps'      => $this->configurationGapsSummary(),
            default                   => null,
        };

        if ($summary === null) {
            return response()->json(['error' => 'Unknown admin dashboard widget.'], 404);
        }

        return response()->json($summary);
    }

    public function growth(Request $request): JsonResponse
    {
        [$currentPeriodStart, $previousPeriodStart] = $this->periodBoundaries();

        return response()->json([
            'title'    => 'Platform Growth Trend',
            'subtitle' => 'Current 30 days compared with the previous 30 days',
            'icon'     => 'chart-line',
            'type'     => 'line',
            'labels'   => ['Previous 30d', 'Current 30d'],
            'datasets' => [
                [
                    'label'           => 'Users',
                    'data'            => [
                        User::whereBetween('created_at', [$previousPeriodStart, $currentPeriodStart])->count(),
                        User::where('created_at', '>=', $currentPeriodStart)->count(),
                    ],
                    'borderColor'     => '#2563eb',
                    'backgroundColor' => 'rgba(37, 99, 235, 0.15)',
                    'tension'         => 0.35,
                    'fill'            => true,
                ],
                [
                    'label'           => 'Organizations',
                    'data'            => [
                        Company::whereBetween('created_at', [$previousPeriodStart, $currentPeriodStart])->count(),
                        Company::where('created_at', '>=', $currentPeriodStart)->count(),
                    ],
                    'borderColor'     => '#059669',
                    'backgroundColor' => 'rgba(5, 150, 105, 0.12)',
                    'tension'         => 0.35,
                    'fill'            => true,
                ],
            ],
            'items'    => [],
            'empty'    => 'No growth data available.',
        ]);
    }

    private function periodBoundaries(): array
    {
        $now = Carbon::now();

        return [$now->copy()->subDays(30), $now->copy()->subDays(60)];
    }

    private function makeKpiMetric(string $title, int $value, int $current, int $previous, string $icon, string $status = 'neutral'): array
    {
        return [
            'title'     => $title,
            'value'     => $value,
            'format'    => 'count',
            'delta_pct' => $this->deltaPercent($current, $previous),
            'status'    => $status,
            'icon'      => $icon,
            'sparkline' => [
                'labels' => ['Previous', 'Current'],
                'data'   => [$previous, $current],
            ],
        ];
    }

    private function deltaPercent(int $current, int $previous): int
    {
        if ($previous === 0) {
            return $current > 0 ? 100 : 0;
        }

        return (int) round((($current - $previous) / $previous) * 100);
    }

    private function organizationsAttentionCount(): int
    {
        return Company::whereNull('onboarding_completed_at')
            ->orWhereNull('owner_uuid')
            ->orWhere(function ($query) {
                $query->whereNotNull('status')->where('status', '!=', 'active');
            })
            ->count();
    }

    private function failedJobsCount(?Carbon $start = null, ?Carbon $end = null): int
    {
        if (!Schema::hasTable('failed_jobs')) {
            return 0;
        }

        $query = DB::table('failed_jobs');

        if ($start && $end) {
            $query->whereBetween('failed_at', [$start, $end]);
        } elseif ($start) {
            $query->where('failed_at', '>=', $start);
        }

        return $query->count();
    }

    private function sensitiveActivityCount(?Carbon $start = null, ?Carbon $end = null): int
    {
        if (!Schema::hasTable(config('activitylog.table_name', 'activity_log'))) {
            return 0;
        }

        $query = Activity::where(function ($query) {
            $query->where('description', 'like', '%impersonat%')
                ->orWhere('description', 'like', '%password%')
                ->orWhere('description', 'like', '%admin%')
                ->orWhere('event', 'like', '%impersonat%')
                ->orWhere('event', 'like', '%password%');
        });

        if ($start && $end) {
            $query->whereBetween('created_at', [$start, $end]);
        } elseif ($start) {
            $query->where('created_at', '>=', $start);
        }

        return $query->count();
    }

    private function systemDiagnosticsSummary(): array
    {
        return [
            'title'    => 'Diagnósticos do Sistema',
            'subtitle' => 'Estado de configuração dos serviços principais',
            'icon'     => 'heart-pulse',
            'empty'    => 'Nenhum diagnóstico disponível.',
            'items'    => [
                $this->diagnosticItem('Correio', config('mail.default'), 'envelope', 'console.admin.config.mail'),
                $this->diagnosticItem('Sistema de ficheiros', config('filesystems.default'), 'hard-drive', 'console.admin.config.filesystem'),
                $this->diagnosticItem('Fila', config('queue.default'), 'list-check', 'console.admin.config.queue'),
                $this->diagnosticItem('Socket', config('broadcasting.default'), 'tower-broadcast', 'console.admin.config.socket'),
                $this->diagnosticItem('Notificações', config('fleetbase.notifications.default_channel', 'configured'), 'bell', 'console.admin.config.notification-channels'),
                $this->diagnosticItem('Agendador', config('schedule-monitor.enabled', true) ? 'configured' : null, 'calendar-check', 'console.admin.schedule-monitor'),
            ],
        ];
    }

    private function diagnosticItem(string $title, mixed $value, string $icon, ?string $route = null): array
    {
        $configured = filled($value);

        return [
            'title'       => $title,
            'description' => $configured ? (string) $value : 'Não configurado',
            'value'       => $configured ? 'OK' : 'Em falta',
            'status'      => $configured ? 'success' : 'danger',
            'icon'        => $icon,
            'route'       => $route,
        ];
    }

    private function adminActivitySummary(): array
    {
        if (!Schema::hasTable(config('activitylog.table_name', 'activity_log'))) {
            return [
                'title'    => 'Atividade de Admin',
                'subtitle' => 'Eventos sensíveis recentes de admin',
                'icon'     => 'clock-rotate-left',
                'empty'    => 'O registo de atividade não está disponível.',
                'items'    => [],
            ];
        }

        $items = Activity::where(function ($query) {
            $query->where('description', 'like', '%impersonat%')
                ->orWhere('description', 'like', '%password%')
                ->orWhere('description', 'like', '%admin%')
                ->orWhere('subject_type', User::class)
                ->orWhere('subject_type', Company::class);
        })
            ->with(['causer'])
            ->orderByDesc('created_at')
            ->limit(12)
            ->get()
            ->map(fn ($activity) => [
                'title'       => $activity->description ?: 'Atividade de admin',
                'description' => trim(collect([data_get($activity, 'causer.name'), optional($activity->created_at)->diffForHumans()])->filter()->implode(' / ')),
                'value'       => $activity->event,
                'status'      => str_contains((string) $activity->description, 'password') ? 'warning' : 'info',
                'icon'        => 'clock-rotate-left',
                'route'       => $activity->subject_type === Company::class && $activity->subject?->public_id ? 'console.admin.organizations.details.activity' : null,
                'routeModels' => $activity->subject_type === Company::class && $activity->subject?->public_id ? [$activity->subject->public_id] : [],
            ])
            ->values();

        return [
            'title'    => 'Atividade de Admin',
            'subtitle' => 'Eventos sensíveis recentes de admin',
            'icon'     => 'clock-rotate-left',
            'empty'    => 'Sem atividade sensível recente de admin.',
            'items'    => $items,
            'route'    => 'console.admin.organizations.index',
        ];
    }

    private function organizationRiskQueueSummary(): array
    {
        $items = Company::query()
            ->whereNull('onboarding_completed_at')
            ->orWhereNull('owner_uuid')
            ->orWhere(function ($query) {
                $query->whereNotNull('status')->where('status', '!=', 'active');
            })
            ->orderByDesc('created_at')
            ->limit(12)
            ->get()
            ->map(function ($company) {
                $reason = $company->owner_uuid === null ? 'Proprietário em falta' : ($company->onboarding_completed_at === null ? 'Onboarding incompleto' : 'Revisão de estado');

                return [
                    'title'       => $company->name,
                    'description' => $company->public_id ?: $company->uuid,
                    'value'       => $reason,
                    'status'      => $reason === 'Revisão de estado' ? 'danger' : 'warning',
                    'icon'        => 'building',
                    'route'       => 'console.admin.organizations.details',
                    'routeModels' => [$company->public_id],
                ];
            })
            ->values();

        return [
            'title'       => 'Fila de Risco de Organizações',
            'subtitle'    => 'Organizações que precisam de revisão do operador',
            'icon'        => 'building-shield',
            'empty'       => 'Nenhuma organização precisa de revisão de momento.',
            'items'       => $items,
            'route'       => 'console.admin.organizations.index',
            'queryParams' => ['needs_attention' => 1],
        ];
    }

    private function configurationGapsSummary(): array
    {
        $items = collect([
            $this->configGapItem('Driver de mail', config('mail.default'), 'envelope', 'console.admin.config.mail'),
            $this->configGapItem('Driver da fila', config('queue.default'), 'list-check', 'console.admin.config.queue'),
            $this->configGapItem('Disco do sistema de ficheiros', config('filesystems.default'), 'hard-drive', 'console.admin.config.filesystem'),
            $this->configGapItem('Driver de broadcast', config('broadcasting.default'), 'tower-broadcast', 'console.admin.config.socket'),
        ])->filter()->values();

        return [
            'title'    => 'Lacunas de Configuração',
            'subtitle' => 'Configuração em falta que pode afetar os operadores',
            'icon'     => 'screwdriver-wrench',
            'empty'    => 'Nenhuma lacuna de configuração detetada.',
            'items'    => $items,
            'route'    => 'console.admin.config',
        ];
    }

    private function configGapItem(string $title, mixed $value, string $icon, ?string $route = null): ?array
    {
        if (filled($value)) {
            return null;
        }

        return [
            'title'       => $title,
            'description' => 'Configuração obrigatória da plataforma em falta.',
            'value'       => 'Em falta',
            'status'      => 'danger',
            'icon'        => $icon,
            'route'       => $route,
        ];
    }
}

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConsoleAdminOrganizationsDetailsIndexController extends Controller {
    @service router;

    get organization() {
        return this.model?.organization;
    }

    get owner() {
        return this.resolveBelongsTo(this.organization?.owner);
    }

    get ownerName() {
        return this.owner?.name;
    }

    get ownerEmail() {
        return this.owner?.email;
    }

    get ownerPhone() {
        return this.owner?.phone;
    }

    get statusLabel() {
        const raw = String(this.organization?.statusLabel || this.organization?.status || 'active').toLowerCase();
        const map = {
            active: 'Ativo',
            pending: 'Pendente',
            suspended: 'Suspenso',
            disabled: 'Desativado',
            inactive: 'Inativo',
        };
        return map[raw] || this.organization?.statusLabel || this.organization?.status || 'Ativo';
    }

    get onboardingState() {
        return this.organization?.onboarding_completed ? 'Completo' : 'Incompleto';
    }

    get usageRows() {
        const usage = this.model?.usage;

        return [
            { key: 'users_count', label: 'Utilizadores da organização' },
            { key: 'drivers_count', label: 'Motoristas' },
            { key: 'customers_count', label: 'Clientes' },
            { key: 'orders_count', label: 'Encomendas' },
            { key: 'api_requests_count', label: 'Chamadas à API' },
            { key: 'webhook_callbacks_count', label: 'Callbacks de webhook' },
        ].map((row) => ({ ...row, value: usage?.[row.key] ?? null }));
    }

    @action refresh() {
        return this.router.refresh();
    }

    resolveBelongsTo(record) {
        if (!record) {
            return null;
        }

        if (record.content) {
            return record.content;
        }

        if (record.isPending || record.isFulfilled === false || typeof record.then === 'function') {
            return null;
        }

        return record;
    }
}

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { isArray } from '@ember/array';
import { task } from 'ember-concurrency';
import window from 'ember-window-mock';

export default class ConsoleAdminOrganizationsDetailsController extends Controller {
    @service router;
    @service fetch;
    @service notifications;
    @service modalsManager;
    @service session;
    @service('universe/menu-service') menuService;

    get tabs() {
        const coreTabs = [
            { route: 'console.admin.organizations.details.index', label: 'Visão geral', icon: 'chart-simple', priority: 0 },
            { route: 'console.admin.organizations.details.users', label: 'Utilizadores', icon: 'users', priority: 10 },
            { route: 'console.admin.organizations.details.activity', label: 'Atividade', icon: 'clock-rotate-left', priority: 30 },
            { route: 'console.admin.organizations.details.settings', label: 'Definições', icon: 'gear', priority: 40 },
        ];
        const registeredTabs = this.visibleRegisteredTabs.map((tab) => ({
            ...tab,
            route: 'console.admin.organizations.details.extensions-tab',
            model: tab.slug,
            priority: tab.priority ?? 50,
        }));
        const tabs = [...coreTabs, ...registeredTabs].sort((a, b) => a.priority - b.priority);

        return tabs.map((tab) => ({
            ...tab,
            active: this.isTabActive(tab),
        }));
    }

    get visibleRegisteredTabs() {
        const registeredTabs = this.menuService.getMenuItems('console:admin:organization:tabs');

        if (!isArray(registeredTabs)) {
            return [];
        }

        return registeredTabs.filter((tab) => {
            if (!tab?.slug || !tab?.component) {
                return false;
            }

            if (typeof tab.isVisible === 'function') {
                return tab.isVisible(this.extensionContext);
            }

            return true;
        });
    }

    get registeredActions() {
        const actions = this.menuService.getMenuItems('console:admin:organization:actions');

        if (!isArray(actions)) {
            return [];
        }

        return actions
            .filter((action) => {
                if (typeof action.isVisible === 'function') {
                    return action.isVisible(this.extensionContext);
                }

                return true;
            })
            .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
    }

    get actionMenuItems() {
        return [
            {
                label: 'Personificar proprietário',
                icon: 'user-secret',
                perform: this.impersonateOwner,
                disabled: !this.ownerId,
            },
            {
                label: 'Copiar ID público',
                icon: 'copy',
                onClick: () => this.copyId(this.organization?.public_id, 'ID público'),
            },
            {
                label: 'Copiar UUID',
                icon: 'fingerprint',
                onClick: () => this.copyId(this.organization?.uuid, 'UUID'),
            },
            {
                label: 'Atualizar',
                icon: 'refresh',
                onClick: this.refresh,
            },
            {
                label: 'Editar definições',
                icon: 'edit',
                onClick: this.editOrganization,
            },
            ...this.registeredActions.map((action) => ({
                label: action.label || action.text || action.title,
                icon: action.icon,
                class: action.class,
                onClick: () => this.runRegisteredAction(action),
            })),
        ];
    }

    get organization() {
        return this.model;
    }

    get organizationStatus() {
        return this.organization?.status || 'active';
    }

    get organizationStatusLabel() {
        const labels = {
            active: 'Ativo',
            inactive: 'Inativo',
            suspended: 'Suspenso',
        };

        return labels[this.organizationStatus] || this.organizationStatus;
    }

    get onboardingStatus() {
        return this.organization?.onboarding_completed ? 'complete' : 'incomplete';
    }

    get onboardingStatusLabel() {
        return this.organization?.onboarding_completed ? 'Onboarding concluído' : 'Onboarding incompleto';
    }

    get billingStatus() {
        return this.organization?.billing_status || 'não configurado';
    }

    get owner() {
        return this.resolveBelongsTo(this.organization?.owner);
    }

    get ownerId() {
        return this.owner?.id || this.owner?.uuid || this.organization?.owner_uuid;
    }

    get ownerName() {
        return this.owner?.name;
    }

    get ownerEmail() {
        return this.owner?.email;
    }

    get hasOwner() {
        return Boolean(this.owner || this.organization?.owner_uuid);
    }

    get extensionContext() {
        return {
            organization: this.organization,
            currentUser: this.session?.data?.authenticated?.user,
            capabilities: {},
        };
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

    isTabActive(tab) {
        const routeName = tab.route;

        if (routeName === 'console.admin.organizations.details.extensions-tab') {
            const currentSlug = this.router.currentRoute?.params?.slug;
            return this.router.currentRouteName === routeName && currentSlug === tab.model;
        }

        return this.router.currentRouteName === routeName || this.router.currentRouteName?.startsWith(`${routeName}.`);
    }

    @action copyId(value, label = 'ID') {
        if (!value) {
            return;
        }

        navigator.clipboard?.writeText(value);
        this.notifications.success(`${label} copiado para a área de transferência.`);
    }

    @action editOrganization() {
        this.modalsManager.show('modals/edit-organization', {
            title: 'Editar Organização',
            acceptButtonText: 'Salvar Alterações',
            acceptButtonIcon: 'save',
            organization: this.organization,
            confirm: async (modal) => {
                modal.startLoading();

                try {
                    await this.organization.save();
                    this.notifications.success('Organização atualizada.');
                    return this.router.refresh();
                } catch (error) {
                    this.notifications.serverError(error);
                }
            },
        });
    }

    @action refresh() {
        this.router.refresh();
    }

    @action runRegisteredAction(action) {
        if (typeof action?.onClick === 'function') {
            return action.onClick(this.extensionContext);
        }

        if (action?.route) {
            return this.router.transitionTo(action.route, this.organization);
        }
    }

    @task *impersonateOwner() {
        if (!this.ownerId) {
            return this.notifications.error('Esta organização não tem proprietário para personificar.');
        }

        try {
            const { token } = yield this.fetch.post('auth/impersonate', { user: this.ownerId });
            yield this.router.transitionTo('console');
            this.session.manuallyAuthenticate(token);
            this.notifications.info(`A personificar ${this.ownerEmail || 'proprietário da organização'}...`);
            later(() => window.location.reload(), 600);
        } catch (error) {
            this.notifications.serverError(error);
        }
    }
}

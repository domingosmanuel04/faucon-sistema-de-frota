import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import window from 'ember-window-mock';

export default class ConsoleAdminOrganizationsDetailsUsersController extends Controller {
    @service intl;
    @service router;
    @service fetch;
    @service notifications;
    @service modalsManager;
    @service session;

    @tracked nestedPage = 1;
    @tracked nestedLimit = 20;
    @tracked nestedSort = '-created_at';
    @tracked nestedQuery = '';
    @tracked company;
    @tracked table;

    queryParams = ['nestedPage', 'nestedLimit', 'nestedSort', 'nestedQuery'];
    actionButtons = [];
    bulkActions = [];

    get sort() {
        return this.nestedSort;
    }

    set sort(value) {
        this.nestedSort = value;
    }

    columns = [
        {
            label: this.intl.t('common.name'),
            valuePath: 'name',
            cellComponent: 'table/cell/identity',
            resourceType: 'user',
            mediaPath: 'avatar_url',
            statusPath: 'status',
            sticky: true,
            resizable: true,
            sortable: true,
            filterable: true,
            filterParam: 'nestedQuery',
            filterComponent: 'filter/string',
        },
        {
            label: this.intl.t('common.role'),
            valuePath: 'role_name',
            resizable: true,
        },
        {
            label: this.intl.t('common.phone'),
            valuePath: 'phone',
            resizable: true,
        },
        {
            label: this.intl.t('common.email'),
            valuePath: 'email',
            resizable: true,
            sortable: true,
            filterable: true,
            filterParam: 'nestedQuery',
            filterComponent: 'filter/string',
        },
        {
            label: this.intl.t('common.status'),
            valuePath: 'status',
            cellComponent: 'table/cell/status',
            resizable: true,
            sortable: true,
        },
        {
            label: 'Autenticação de dois fatores',
            valuePath: 'two_factor_enabled',
            cellComponent: 'admin/table/cell/two-factor',
            resizable: true,
        },
        {
            label: 'Fornecedores de início de sessão',
            valuePath: 'oauth_providers',
            cellComponent: 'admin/table/cell/oauth-providers',
            resizable: true,
        },
        {
            label: 'Último início de sessão',
            valuePath: 'lastLogin',
            resizable: true,
            width: '180px',
            cellClassNames: 'whitespace-nowrap pr-10',
        },
        {
            label: '',
            cellComponent: 'table/cell/dropdown',
            ddButtonText: false,
            ddButtonIcon: 'ellipsis-h',
            ddButtonIconPrefix: 'fas',
            ddMenuLabel: 'Ações do utilizador',
            cellClassNames: 'overflow-visible',
            wrapperClass: 'flex items-center justify-end mx-2',
            width: 88,
            actions: [
                {
                    label: 'Personificar',
                    icon: 'user-secret',
                    fn: this.impersonateUser,
                },
                {
                    label: 'Alterar palavra-passe',
                    icon: 'lock-open',
                    fn: this.changeUserPassword,
                },
                {
                    separator: true,
                },
                {
                    label: 'Verificar',
                    icon: 'circle-check',
                    fn: this.verifyUser,
                },
                {
                    label: 'Ativar',
                    icon: 'user-check',
                    fn: this.activateUser,
                },
                {
                    label: 'Desativar',
                    icon: 'user-slash',
                    fn: this.deactivateUser,
                },
                {
                    label: 'Transferir propriedade',
                    icon: 'crown',
                    fn: this.transferOwnership,
                },
                {
                    label: 'Remover da organização',
                    icon: 'user-xmark',
                    class: 'text-red-600',
                    fn: this.removeUser,
                },
            ],
            sortable: false,
            filterable: false,
            resizable: false,
            searchable: false,
            sticky: 'right',
        },
    ];

    @action async impersonateUser(user) {
        try {
            const { token } = await this.fetch.post('auth/impersonate', { user: user.id });
            await this.router.transitionTo('console');
            this.session.manuallyAuthenticate(token);
            this.notifications.info(`A personificar ${user.email}...`);
            later(() => window.location.reload(), 600);
        } catch (error) {
            this.notifications.serverError(error);
        }
    }

    @action changeUserPassword(user) {
        this.modalsManager.show('modals/change-user-password', {
            keepOpen: true,
            user,
        });
    }

    @action async verifyUser(user) {
        return this.runUserLifecycleAction(user, 'verify', 'Utilizador verificado.');
    }

    @action async activateUser(user) {
        return this.runUserLifecycleAction(user, 'activate', 'Utilizador ativado.');
    }

    @action async deactivateUser(user) {
        return this.confirmUserLifecycleAction(
            user,
            'Desativar utilizador',
            `Desativar ${user.name || user.email} nesta organização?`,
            'deactivate',
            'Utilizador desativado.'
        );
    }

    @action transferOwnership(user) {
        this.modalsManager.confirm({
            title: 'Transferir propriedade',
            body: `Transferir a propriedade da organização para ${user.name || user.email}?`,
            acceptButtonText: 'Transferir propriedade',
            acceptButtonIcon: 'crown',
            confirm: async (modal) => {
                modal.startLoading();

                try {
                    await this.fetch.post(`companies/${this.company.uuid}/transfer-ownership`, { newOwner: this.userIdentifier(user) });
                    this.notifications.success('Propriedade da organização transferida.');
                    return this.router.refresh();
                } catch (error) {
                    this.notifications.serverError(error);
                }
            },
        });
    }

    @action removeUser(user) {
        return this.confirmUserLifecycleAction(
            user,
            'Remover utilizador',
            `Remover ${user.name || user.email} desta organização?`,
            null,
            'Utilizador removido.',
            async () => {
                await this.fetch.delete(`companies/${this.company.uuid}/users/${this.userIdentifier(user)}`);
            }
        );
    }

    @action search(event) {
        this.nestedQuery = event.target.value ?? '';
        this.nestedPage = 1;
    }

    @action refresh() {
        return this.router.refresh();
    }

    async runUserLifecycleAction(user, action, successMessage) {
        try {
            await this.fetch.patch(`companies/${this.company.uuid}/users/${this.userIdentifier(user)}/${action}`);
            this.notifications.success(successMessage);
            return this.router.refresh();
        } catch (error) {
            this.notifications.serverError(error);
        }
    }

    confirmUserLifecycleAction(user, title, body, action, successMessage, callback = null) {
        this.modalsManager.confirm({
            title,
            body,
            acceptButtonText: title,
            confirm: async (modal) => {
                modal.startLoading();

                try {
                    if (typeof callback === 'function') {
                        await callback();
                        this.notifications.success(successMessage);
                        return this.router.refresh();
                    }

                    return this.runUserLifecycleAction(user, action, successMessage);
                } catch (error) {
                    this.notifications.serverError(error);
                }
            },
        });
    }

    userIdentifier(user) {
        return user?.uuid || user?.id;
    }
}

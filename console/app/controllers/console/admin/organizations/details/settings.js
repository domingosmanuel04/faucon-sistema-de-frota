import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConsoleAdminOrganizationsDetailsSettingsController extends Controller {
    @service router;
    @service fetch;
    @service notifications;
    @service modalsManager;

    @action editOrganization() {
        this.modalsManager.show('modals/edit-organization', {
            title: 'Editar Organização',
            acceptButtonText: 'Salvar Alterações',
            acceptButtonIcon: 'save',
            organization: this.model,
            confirm: async (modal) => {
                modal.startLoading();

                try {
                    await this.model.save();
                    this.notifications.success('Organização atualizada.');
                    return this.router.refresh();
                } catch (error) {
                    this.notifications.serverError(error);
                }
            },
        });
    }

    @action setStatus(status) {
        const statusLabels = {
            active: 'ativo',
            inactive: 'inativo',
            suspended: 'suspenso',
        };
        const label = statusLabels[status] || status;

        this.modalsManager.confirm({
            title: 'Atualizar Estado da Organização',
            body: `Definir o estado desta organização como ${label}?`,
            acceptButtonText: 'Atualizar Estado',
            confirm: async (modal) => {
                modal.startLoading();

                try {
                    await this.fetch.patch(`companies/${this.model.uuid}/status`, { status });
                    this.notifications.success('Estado da organização atualizado.');
                    return this.router.refresh();
                } catch (error) {
                    this.notifications.serverError(error);
                }
            },
        });
    }

    @action setOnboarding(completed) {
        this.modalsManager.confirm({
            title: completed ? 'Marcar Onboarding como Concluído' : 'Marcar Onboarding como Incompleto',
            body: completed
                ? 'Marcar o onboarding desta organização como concluído?'
                : 'Marcar o onboarding desta organização como incompleto?',
            acceptButtonText: completed ? 'Marcar como concluído' : 'Marcar como incompleto',
            confirm: async (modal) => {
                modal.startLoading();

                try {
                    await this.fetch.patch(`companies/${this.model.uuid}/onboarding`, { completed });
                    this.notifications.success('Onboarding da organização atualizado.');
                    return this.router.refresh();
                } catch (error) {
                    this.notifications.serverError(error);
                }
            },
        });
    }
}

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import groupBy from '@fleetbase/ember-core/utils/group-by';

const PACKAGE_LABELS = {
    core: 'Principais',
    fleetops: 'Fleet-Ops',
    storefront: 'Loja Online',
    iam: 'IAM',
};

const NOTIFICATION_LABELS = {
    'User Created': 'Utilizador criado',
    'User Accepted Company Invite': 'Utilizador aceitou convite da empresa',
};

const NOTIFICATION_DESCRIPTIONS = {
    'User Created': 'Notificar quando um novo utilizador for criado.',
    'User Accepted Company Invite': 'Notificar quando um utilizador aceitar o convite da empresa.',
};

function localizeRegistry(registry = []) {
    return (Array.isArray(registry) ? registry : []).map((item) => {
        const name = item?.name;
        const pkg = String(item?.package || '').toLowerCase();

        return {
            ...item,
            package: PACKAGE_LABELS[pkg] || item?.package,
            label: NOTIFICATION_LABELS[name] || name,
            description: NOTIFICATION_DESCRIPTIONS[name] || item?.description,
        };
    });
}

export default class ConsoleSettingsNotificationsRoute extends Route {
    @service fetch;
    @service currentUser;

    model() {
        return hash({
            registry: this.fetch.get('notifications/registry'),
            notifiables: this.fetch.get('notifications/notifiables'),
        });
    }

    async setupController(controller, { registry, notifiables }) {
        super.setupController(...arguments);

        controller.groupedNotifications = groupBy(localizeRegistry(registry), 'package');
        controller.notifiables = notifiables;
        controller.company = await this.currentUser.loadCompany();
    }
}

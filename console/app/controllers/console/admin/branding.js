import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { isArray } from '@ember/array';

export default class ConsoleAdminBrandingController extends Controller {
    @service fetch;
    @service notifications;
    @service theme;

    @tracked isLoading = false;
    @tracked themeOptions = [
        { value: 'light', label: 'Claro' },
        { value: 'dark', label: 'Escuro' },
    ];

    @action setTheme(theme) {
        const value = theme?.value ?? theme;
        this.model.set('default_theme', value);
        this.theme.setTheme(value);
        return this.save();
    }

    @action unset(key, newValue = null) {
        if (isArray(key)) {
            return key.forEach((k) => this.unset(k, undefined));
        }

        this.model.set(key, newValue);
    }

    @action unsetIcon() {
        this.unset(['icon_uuid', 'icon_url']);
        this.model.set('icon_url', '/images/icon.png');
        return this.save();
    }

    @action unsetLogo() {
        this.unset(['logo_uuid', 'logo_url']);
        this.model.set('logo_url', '/images/fleetbase-logo-svg.svg');
        return this.save();
    }

    @action save() {
        this.isLoading = true;

        return this.model
            .save()
            .then((brand) => {
                this.notifications.success('Identidade visual guardada.');

                if (brand?.default_theme) {
                    this.theme.setTheme(brand.default_theme);
                }

                if (this.model.logo_url === null) {
                    this.model.set('logo_url', '/images/fleetbase-logo-svg.svg');
                }

                if (this.model.icon_url === null) {
                    this.model.set('icon_url', '/images/icon.png');
                }
            })
            .catch((error) => {
                if (typeof this.notifications.serverError === 'function') { this.notifications.serverError(error); } else { this.notifications.error('Não foi possível guardar a identidade visual.'); }
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    @action uploadIcon(file) {
        this.isLoading = true;

        return this.fetch.uploadFile.perform(
            file,
            {
                path: `uploads/system`,
                type: `system`,
            },
            (uploadedFile) => {
                this.model.set('icon_uuid', uploadedFile.id);
                this.model.set('icon_url', uploadedFile.url);
                this.isLoading = false;
                return this.save();
            },
            () => {
                this.isLoading = false;
            }
        );
    }

    @action uploadLogo(file) {
        this.isLoading = true;

        return this.fetch.uploadFile.perform(
            file,
            {
                path: `uploads/system`,
                type: `system`,
            },
            (uploadedFile) => {
                this.model.set('logo_uuid', uploadedFile.id);
                this.model.set('logo_url', uploadedFile.url);
                this.isLoading = false;
                return this.save();
            },
            () => {
                this.isLoading = false;
            }
        );
    }
}

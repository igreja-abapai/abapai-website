import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import {
    WebsiteSettingsService,
    WebsiteSettings,
} from '../services/website-settings.service';

export const websiteSettingsResolver: ResolveFn<WebsiteSettings | null> = () => {
    const websiteSettingsService = inject(WebsiteSettingsService);

    return websiteSettingsService.getSettings();
};


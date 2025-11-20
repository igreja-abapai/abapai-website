import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    WebsiteSettingsService,
    WebsiteSettings,
} from '../../services/website-settings.service';

@Component({
    selector: 'app-donations',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './donations-page.component.html',
    styleUrl: './donations-page.component.scss',
})
export class DonationsPageComponent implements OnInit {
    websiteSettings: WebsiteSettings | null = null;

    loading = true;

    error = '';

    private route = inject(ActivatedRoute);

    private websiteSettingsService = inject(WebsiteSettingsService);

    ngOnInit(): void {
        // Check if data was resolved during SSR
        const resolved = this.route.snapshot.data['websiteSettings'] as
            | WebsiteSettings
            | undefined;
        if (resolved) {
            this.websiteSettings = resolved;
            this.loading = false;
        } else {
            this.loadWebsiteSettings();
        }
    }

    private loadWebsiteSettings(): void {
        this.websiteSettingsService.getSettings().subscribe({
            next: (settings) => {
                this.websiteSettings = settings;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading website settings:', err);
                // Use fallback data instead of showing error
                // The getBankInfo() and getPixInfo() methods already have fallback logic
                this.websiteSettings = null;
                this.loading = false;
            },
        });
    }

    getBankInfo() {
        return (
            this.websiteSettings?.bankInfo || {
                bank: '403 - Banco Cora SDC',
                agency: '0001',
                account: '4416982-0',
                cnpj: '52.782.534/0001-10',
                name: 'Ministério Cristão Aba Pai',
            }
        );
    }

    getPixInfo() {
        return (
            this.websiteSettings?.pixInfo || {
                type: 'CNPJ',
                key: '52.782.534/0001-10',
                name: 'MINISTÉRIO CRISTÃO ABA PAI',
            }
        );
    }
}

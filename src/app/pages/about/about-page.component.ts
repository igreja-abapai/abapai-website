import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
    WebsiteSettingsService,
    WebsiteSettings,
} from '../../services/website-settings.service';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about-page.component.html',
    styleUrl: './about-page.component.scss',
})
export class AboutPageComponent implements OnInit {
    private websiteSettingsService = inject(WebsiteSettingsService);

    private route = inject(ActivatedRoute);

    websiteSettings: WebsiteSettings | null = null;

    loading = true;

    error: string | null = null;

    ngOnInit() {
        // Check if data was already loaded during SSR
        const resolvedData = this.route.snapshot.data['websiteSettings'];
        if (resolvedData) {
            this.websiteSettings = resolvedData;
            this.loading = false;
        } else {
            // Fallback to client-side loading if SSR didn't work
            this.loadWebsiteSettings();
        }
    }

    private loadWebsiteSettings() {
        this.websiteSettingsService.getSettings().subscribe({
            next: (settings) => {
                this.websiteSettings = settings;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading website settings:', err);
                this.error = 'Erro ao carregar conteúdo da página';
                this.loading = false;
            },
        });
    }

    // Fallback content methods
    getWhoWeAreContent(): string {
        return this.websiteSettings?.aboutWhoWeAre || '';
    }

    getOurMissionContent(): string {
        return this.websiteSettings?.aboutOurMission || '';
    }

    getOurValuesContent(): string {
        return this.websiteSettings?.aboutOurValues || '';
    }
}

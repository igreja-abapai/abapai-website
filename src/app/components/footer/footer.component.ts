import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faYoutube,
    faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';
import {
    WebsiteSettingsService,
    WebsiteSettings,
} from '../../services/website-settings.service';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [FontAwesomeModule, RouterModule, CommonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
    faFacebookF = faFacebookF;

    faInstagram = faInstagram;

    faYoutube = faYoutube;

    faXTwitter = faXTwitter;

    websiteSettings: WebsiteSettings | null = null;

    loading = true;

    error = '';

    constructor(private websiteSettingsService: WebsiteSettingsService) {}

    ngOnInit() {
        this.loadWebsiteSettings();
    }

    private loadWebsiteSettings() {
        this.websiteSettingsService.getSettings().subscribe({
            next: (settings) => {
                this.websiteSettings = settings;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading website settings:', error);
                this.error = 'Erro ao carregar informações do site';
                this.loading = false;
            },
        });
    }

    getAddress(): string {
        return this.websiteSettings?.address || '';
    }

    getEmail(): string {
        return this.websiteSettings?.email || '';
    }

    getPhone(): string {
        return this.websiteSettings?.phone || '';
    }

    getFacebookUrl(): string {
        return (
            this.websiteSettings?.facebook ||
            'https://www.facebook.com/igrejaministeriocristaoabapai'
        );
    }

    getInstagramUrl(): string {
        return (
            this.websiteSettings?.instagram || 'https://www.instagram.com/igrejamcabapai'
        );
    }

    getYoutubeUrl(): string {
        return (
            this.websiteSettings?.youtube ||
            'https://www.youtube.com/@MINIST%C3%89RIOCRIST%C3%83OABAPAI'
        );
    }

    getTwitterUrl(): string {
        return this.websiteSettings?.twitter || 'https://x.com/igrejamcabapai';
    }
}

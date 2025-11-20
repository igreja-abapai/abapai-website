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
                // Use fallback data instead of showing error
                // The getter methods already have fallback logic
                this.websiteSettings = null;
                this.loading = false;
            },
        });
    }

    getAddress(): string {
        return (
            this.websiteSettings?.address ||
            'Rua Adail Pamplona de menezes n°38 Nova Parnamirim, Parnamirim, RN, Brazil'
        );
    }

    getEmail(): string {
        return this.websiteSettings?.email || 'igrejamcabapai@hotmail.com';
    }

    getPhone(): string {
        return this.websiteSettings?.phone || '+55 (84) 99830-5218';
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

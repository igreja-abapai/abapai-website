import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faXTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FooterComponent } from '../footer/footer.component';
import {
    WebsiteSettingsService,
    WebsiteSettings,
} from '../../services/website-settings.service';
import { RadioAudioPlayerComponent } from '../radio-audio-player/radio-audio-player.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterModule, FontAwesomeModule, RadioAudioPlayerComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
    menuExpanded = false;

    @ViewChild(FooterComponent) footerComponent!: ElementRef;

    faFacebookF = faFacebookF;

    faInstagram = faInstagram;

    faYoutube = faYoutube;

    faXTwitter = faXTwitter;

    websiteSettings: WebsiteSettings | null = null;

    constructor(private websiteSettingsService: WebsiteSettingsService) {}

    ngOnInit() {
        this.websiteSettingsService.getSettings().subscribe({
            next: (settings) => (this.websiteSettings = settings),
            error: () => (this.websiteSettings = null),
        });
    }

    toggleMenu() {
        this.menuExpanded = !this.menuExpanded;
    }

    scrollToElement(elementId: string) {
        const footer = document.getElementById(elementId);
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
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

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { WebsiteSettingsService } from '../../../services/website-settings.service';

@Component({
    selector: 'app-whatsapp-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './whatsapp-button.component.html',
})
export class WhatsAppButtonComponent implements OnInit {
    private websiteSettingsService = inject(WebsiteSettingsService);

    private phoneNumber = '5584998305218';

    private defaultMessage = encodeURIComponent('Olá, poderia me ajudar?');

    ngOnInit(): void {
        this.loadWebsiteSettings();
    }

    private loadWebsiteSettings(): void {
        this.websiteSettingsService.getSettings().subscribe((settings) => {
            if (settings.whatsapp) {
                this.phoneNumber = settings.whatsapp;
            }
        });
    }

    openWhatsApp(): void {
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${this.defaultMessage}`;
        window.open(whatsappUrl, '_blank');
    }
}

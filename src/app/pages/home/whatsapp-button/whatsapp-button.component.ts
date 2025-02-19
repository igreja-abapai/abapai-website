import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-whatsapp-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './whatsapp-button.component.html',
})
export class WhatsAppButtonComponent {
    private phoneNumber = '5584998305218';

    private defaultMessage = encodeURIComponent(
        'Olá, poderia me ajudar?',
    );

    openWhatsApp(): void {
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${this.defaultMessage}`;
        window.open(whatsappUrl, '_blank');
    }
}

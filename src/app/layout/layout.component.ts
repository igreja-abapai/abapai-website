import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { ElementRef } from '@angular/core';
import { RadioAudioPlayerComponent } from '../components/radio-audio-player/radio-audio-player.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [FontAwesomeModule, RadioAudioPlayerComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
})
export class LayoutComponent {
    faFacebookF = faFacebookF;
    faInstagram = faInstagram;
    faYoutube = faYoutube;

    constructor() {}

    scrollToSection(ref: ElementRef): void {
        // Implement scrolling logic
    }
}

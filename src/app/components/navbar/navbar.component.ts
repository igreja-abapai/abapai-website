import { Component, ElementRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RadioAudioPlayerComponent } from '../radio-audio-player/radio-audio-player.component';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterModule, FontAwesomeModule, RadioAudioPlayerComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    faFacebookF = faFacebookF;
    faInstagram = faInstagram;
    faYoutube = faYoutube;

    constructor() {}

    scrollToSection(ref: ElementRef): void {
        // Implement scrolling logic
    }
}

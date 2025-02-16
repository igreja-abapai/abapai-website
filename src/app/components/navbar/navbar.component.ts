import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { RadioAudioPlayerComponent } from '../radio-audio-player/radio-audio-player.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterModule, FontAwesomeModule, RadioAudioPlayerComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    menuExpanded = false;

    faFacebookF = faFacebookF;

    faInstagram = faInstagram;

    faYoutube = faYoutube;

    constructor() {}

    // scrollToSection(ref: ElementRef): void {
    //     // Implement scrolling logic
    // }

    toggleMenu() {
        this.menuExpanded = !this.menuExpanded;
    }
}

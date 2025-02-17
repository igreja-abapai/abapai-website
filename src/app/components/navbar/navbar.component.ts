import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FooterComponent } from '../footer/footer.component';
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

    @ViewChild(FooterComponent) footerComponent!: ElementRef;

    faFacebookF = faFacebookF;

    faInstagram = faInstagram;

    faYoutube = faYoutube;

    constructor() {}

    toggleMenu() {
        this.menuExpanded = !this.menuExpanded;
    }

    scrollToElement(elementId: string) {
        const footer = document.getElementById(elementId);
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

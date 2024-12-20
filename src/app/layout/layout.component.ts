import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faRadio } from '@fortawesome/free-solid-svg-icons';
import { ElementRef } from '@angular/core';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
    faFacebookF = faFacebookF;
    faInstagram = faInstagram;
    faYoutube = faYoutube;
    faRadio = faRadio;

    playingNow = '';
    // messageRef: ElementRef;

    constructor() {}

    ngOnInit(): void {
        this.fetchPlayingNow();
    }

    scrollToSection(ref: ElementRef): void {
        // Implement scrolling logic
    }

    fetchPlayingNow(): void {
        fetch('https://websitenoar.net/last/cur.php?hts=hts01&porta=12044')
            .then((response) => response.text())
            .then((data) => (this.playingNow = data.split('||IMAGE||')[0]))
            .catch((error) => console.error('Error:', error));
    }
}

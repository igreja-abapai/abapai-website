import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faRadio } from '@fortawesome/free-solid-svg-icons';
import { ElementRef } from '@angular/core';
import { AudioPlayerComponent } from '../components/audio-player/audio-player.component';
import { interval, Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [FontAwesomeModule, AudioPlayerComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
    private platformId = inject(PLATFORM_ID);

    faFacebookF = faFacebookF;
    faInstagram = faInstagram;
    faYoutube = faYoutube;
    faRadio = faRadio;

    playingNow = '';
    private updateSubscription?: Subscription;

    constructor() {}

    ngOnInit(): void {
        // Only run on client side
        if (isPlatformBrowser(this.platformId)) {
            // Initial fetch
            this.fetchPlayingNow();

            // Set up interval for periodic updates
            this.updateSubscription = interval(20000).subscribe(() => {
                this.fetchPlayingNow();
            });
        }
    }

    ngOnDestroy(): void {
        if (this.updateSubscription) {
            this.updateSubscription.unsubscribe();
        }
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

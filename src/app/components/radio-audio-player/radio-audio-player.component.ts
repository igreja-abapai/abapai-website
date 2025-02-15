import { isPlatformBrowser } from '@angular/common';
import {
    Component,
    ElementRef,
    inject,
    OnDestroy,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faBackwardStep,
    faForwardStep,
    faPause,
    faPlay,
    faRadio,
} from '@fortawesome/free-solid-svg-icons';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-radio-audio-player',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './radio-audio-player.component.html',
    styleUrl: './radio-audio-player.component.scss',
})
export class RadioAudioPlayerComponent implements OnDestroy {
    @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

    private platformId = inject(PLATFORM_ID);

    faPlay = faPlay;

    faBackwardStep = faBackwardStep;

    faForwardStep = faForwardStep;

    faPause = faPause;

    faRadio = faRadio;

    isPlaying = false;

    volume = 100;

    playingNow = '';

    private updateSubscription?: Subscription;

    ngOnDestroy(): void {
        this.stopPlayingNowUpdates();
    }

    private startPlayingNowUpdates(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.fetchPlayingNow();
            this.updateSubscription = interval(20000).subscribe(() => {
                this.fetchPlayingNow();
            });
        }
    }

    private stopPlayingNowUpdates(): void {
        if (this.updateSubscription) {
            this.updateSubscription.unsubscribe();
            this.updateSubscription = undefined;
        }
        this.playingNow = '';
    }

    fetchPlayingNow(): void {
        fetch('https://websitenoar.net/last/cur.php?hts=hts01&porta=12044')
            .then((response) => response.text())
            .then((data) => (this.playingNow = data.split('||IMAGE||')[0]))
            // eslint-disable-next-line no-console
            .catch((error) => console.error('Error:', error));
    }

    toggleAudio(): void {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.audioPlayer.nativeElement.load();
            this.audioPlayer.nativeElement?.play();
            this.startPlayingNowUpdates();
        } else {
            this.isPlaying = false;
            this.audioPlayer.nativeElement?.pause();
            this.stopPlayingNowUpdates();
        }
    }

    handleVolumeChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const newVolume = parseInt(target.value);
        this.volume = newVolume;
        if (this.audioPlayer.nativeElement) {
            this.audioPlayer.nativeElement.volume = newVolume / 100;
        }
    }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faPlay,
    faBackwardStep,
    faForwardStep,
    faPause,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-audio-player',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './audio-player.component.html',
    styleUrl: './audio-player.component.scss',
})
export class AudioPlayerComponent {
    @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

    faPlay = faPlay;
    faBackwardStep = faBackwardStep;
    faForwardStep = faForwardStep;
    faPause = faPause;

    isPlaying = false;
    volume = 100;

    toggleAudio(): void {
        if (!this.isPlaying) {
            this.isPlaying = true;
            
            this.audioPlayer.nativeElement.load();
            this.audioPlayer.nativeElement?.play();
        } else {
            this.isPlaying = false;
            this.audioPlayer.nativeElement?.pause();
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

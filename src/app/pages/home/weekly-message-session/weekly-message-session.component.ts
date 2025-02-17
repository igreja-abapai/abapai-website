import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-weekly-message',
    standalone: true,
    imports: [],
    templateUrl: './weekly-message-session.component.html',
    styleUrls: ['./weekly-message-session.component.scss'],
})
export class WeeklyMessageComponent {
    playerImageSrc = 'assets/video_player.png';

    videoThumbnail = 'https://img.youtube.com/vi/wjleWU8J2GY/maxresdefault.jpg';

    videoUrl =
        'https://www.youtube.com/embed/wjleWU8J2GY?autoplay=0&rel=0&fs=1&modestbranding=1';

    isPlaying = false;

    safeVideoUrl: any;

    constructor(private sanitizer: DomSanitizer) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
    }

    playVideo() {
        this.isPlaying = true;
    }
}

import { Component } from '@angular/core';

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
        'https://www.youtube.com/embed/wjleWU8J2GY?autoplay=1&rel=0&fs=1&modestbranding=1';
}

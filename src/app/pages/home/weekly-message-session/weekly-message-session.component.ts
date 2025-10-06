import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
    WebsiteSettingsService,
    WebsiteSettings,
} from '../../../services/website-settings.service';

@Component({
    selector: 'app-weekly-message',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './weekly-message-session.component.html',
    styleUrls: ['./weekly-message-session.component.scss'],
})
export class WeeklyMessageComponent implements OnInit {
    playerImageSrc = 'assets/video_player.png';

    videoThumbnail = '';

    videoUrl = '';

    isPlaying = false;

    safeVideoUrl?: SafeResourceUrl;

    title = '';

    date = '';

    private sanitizer = inject(DomSanitizer);

    private websiteSettingsService = inject(WebsiteSettingsService);

    ngOnInit() {
        this.websiteSettingsService.getSettings().subscribe({
            next: (settings: WebsiteSettings) => {
                this.videoUrl = this.computeEmbedUrl(settings.weeklyMessageUrl);
                this.safeVideoUrl = this.videoUrl
                    ? this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl)
                    : undefined;
                this.videoThumbnail = this.computeThumbnail(settings.weeklyMessageUrl);
                this.title = settings.weeklyMessageTitle || '';
                this.date = settings.weeklyMessageDate || '';
            },
            error: () => {
                this.videoUrl =
                    'https://www.youtube.com/embed/wjleWU8J2GY?autoplay=0&rel=0&fs=1&modestbranding=1';
                this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                    this.videoUrl,
                );
                this.videoThumbnail =
                    'https://img.youtube.com/vi/wjleWU8J2GY/maxresdefault.jpg';
                this.title = 'A visão de quem quer milagre - Pr. Raimundo Feliciano';
                this.date = '21 JUL 2022';
            },
        });
    }

    playVideo() {
        this.isPlaying = true;
    }

    private computeEmbedUrl(url: string | undefined): string {
        if (!url) {
            return '';
        }

        const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
        const videoId = match ? match[1] : '';
        return videoId
            ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&fs=1&modestbranding=1`
            : url;
    }

    private computeThumbnail(url: string | undefined): string {
        if (!url) {
            return '';
        }
        const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
        const videoId = match ? match[1] : '';
        return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
    }
}

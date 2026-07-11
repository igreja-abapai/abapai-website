import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    Component,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
    LiveService,
    YoutubeLiveCurrent,
    YoutubeLiveVideo,
} from '../../services/live.service';

@Component({
    selector: 'app-live-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './live-page.component.html',
    styleUrl: './live-page.component.scss',
})
export class LivePageComponent implements OnInit, OnDestroy {
    isLive = false;

    liveTitle = '';

    upcoming: YoutubeLiveVideo[] = [];

    liveVideoId: string | null = null;

    liveThumbnail: string | null = null;

    safeEmbedUrl?: SafeResourceUrl;

    readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    private route = inject(ActivatedRoute);

    private liveService = inject(LiveService);

    private sanitizer = inject(DomSanitizer);

    private pollSubscription?: Subscription;

    constructor() {
        const resolved = this.route.snapshot.data['live'] as YoutubeLiveCurrent | undefined;
        this.applyPayload(resolved);
    }

    ngOnInit(): void {
        if (this.isBrowser) {
            this.pollSubscription = interval(60_000)
                .pipe(switchMap(() => this.liveService.getCurrent()))
                .subscribe({
                    next: (payload) => this.applyPayload(payload),
                });
        }
    }

    ngOnDestroy(): void {
        this.pollSubscription?.unsubscribe();
    }

    formatScheduledDate(value: string | null): string {
        if (!value) {
            return 'Data a definir';
        }

        return new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            timeZone: 'America/Sao_Paulo',
        }).format(new Date(value));
    }

    formatScheduledTime(value: string | null): string {
        if (!value) {
            return '--:--';
        }

        return new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo',
        }).format(new Date(value));
    }

    private applyPayload(payload?: YoutubeLiveCurrent): void {
        if (!payload) {
            return;
        }

        const nextLiveVideoId = payload.liveVideo?.videoId ?? null;

        this.isLive = payload.isLive;
        this.upcoming = (payload.upcoming ?? []).filter(
            (video) => video.videoId !== nextLiveVideoId,
        );

        if (payload.liveVideo?.title) {
            this.liveTitle = payload.liveVideo.title;
        } else if (!payload.isLive) {
            this.liveTitle = '';
        }

        if (nextLiveVideoId !== this.liveVideoId) {
            this.liveVideoId = nextLiveVideoId;
            this.liveThumbnail = payload.liveVideo?.thumbnailUrl ?? null;
            this.safeEmbedUrl =
                nextLiveVideoId && payload.liveVideo?.embedUrl
                    ? this.sanitizer.bypassSecurityTrustResourceUrl(payload.liveVideo.embedUrl)
                    : undefined;
        } else if (payload.liveVideo?.thumbnailUrl) {
            this.liveThumbnail = payload.liveVideo.thumbnailUrl;
        }
    }
}

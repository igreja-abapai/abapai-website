import {
    Injectable,
    PLATFORM_ID,
    TransferState,
    inject,
    makeStateKey,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../shared/environments/environment';

export interface YoutubeLiveVideo {
    videoId: string;
    title: string;
    embedUrl: string;
    thumbnailUrl: string | null;
    scheduledStartTime: string | null;
    actualStartTime: string | null;
}

export interface YoutubeLiveCurrent {
    isLive: boolean;
    liveVideo: YoutubeLiveVideo | null;
    upcoming: YoutubeLiveVideo[];
    nextScheduledAt: string | null;
    syncedAt: string | null;
}

@Injectable({ providedIn: 'root' })
export class LiveService {
    private http = inject(HttpClient);

    private transferState = inject(TransferState);

    private platformId = inject(PLATFORM_ID);

    private apiUrl = environment.clientApiBaseUrl;

    private STATE_KEY = makeStateKey<YoutubeLiveCurrent>('youtube_live_current');

    getCurrent(): Observable<YoutubeLiveCurrent> {
        const cached = this.transferState.get(
            this.STATE_KEY,
            null as unknown as YoutubeLiveCurrent | null,
        );
        if (cached) {
            this.transferState.remove(this.STATE_KEY);
            return of(cached);
        }

        return this.http.get<YoutubeLiveCurrent>(`${this.apiUrl}/live/current`).pipe(
            tap((payload) => {
                if (isPlatformServer(this.platformId)) {
                    this.transferState.set(this.STATE_KEY, payload);
                }
            }),
            shareReplay(1),
        );
    }
}

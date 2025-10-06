import {
    Injectable,
    inject,
    PLATFORM_ID,
    TransferState,
    makeStateKey,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformServer } from '@angular/common';
import { tap, shareReplay } from 'rxjs/operators';
import { environment } from '../shared/environments/environment';

export interface WebsiteSettings {
    id: number;
    address: string;
    phone: string;
    email: string;
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
    about: string;
    serviceTimes: string;
    aboutWhoWeAre: string;
    aboutOurMission: string;
    aboutOurValues: string;
    weeklyMessageUrl: string;
    weeklyMessageTitle: string;
    weeklyMessageDate: string;
    maintenanceMode: boolean;
    createdAt: string;
    updatedAt: string;
}

@Injectable({
    providedIn: 'root',
})
export class WebsiteSettingsService {
    private http = inject(HttpClient);

    private transferState = inject(TransferState);

    private platformId = inject(PLATFORM_ID);

    private apiUrl = environment.clientApiBaseUrl;

    private STATE_KEY = makeStateKey<WebsiteSettings>('website_settings');

    private settings$?: Observable<WebsiteSettings>;

    getSettings(): Observable<WebsiteSettings> {
        if (this.settings$) {
            return this.settings$;
        }

        // Try to read from TransferState (set during SSR)
        const cached = this.transferState.get(
            this.STATE_KEY,
            null as unknown as WebsiteSettings | null,
        );
        if (cached) {
            // Remove after read to avoid stale state on client navigations
            this.transferState.remove(this.STATE_KEY);
            this.settings$ = of(cached).pipe(shareReplay(1));
            return this.settings$;
        }

        // If not cached, fetch from API. On the server, store into TransferState.
        this.settings$ = this.http
            .get<WebsiteSettings>(`${this.apiUrl}/website/settings`)
            .pipe(
                tap((settings) => {
                    if (isPlatformServer(this.platformId)) {
                        this.transferState.set(this.STATE_KEY, settings);
                    }
                }),
                shareReplay(1),
            );
        return this.settings$;
    }
}

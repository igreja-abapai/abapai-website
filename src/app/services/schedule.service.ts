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

export interface ScheduleEvent {
    id: number;
    name: string;
    time: string;
    days: string | string[];
    position: number;
    createdAt: string;
    updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ScheduleService {
    private http = inject(HttpClient);

    private transferState = inject(TransferState);

    private platformId = inject(PLATFORM_ID);

    private apiUrl = environment.clientApiBaseUrl;

    private STATE_KEY = makeStateKey<ScheduleEvent[]>('schedule_events');

    private events$?: Observable<ScheduleEvent[]>;

    getEvents(): Observable<ScheduleEvent[]> {
        if (this.events$) {
            return this.events$;
        }

        const cached = this.transferState.get(
            this.STATE_KEY,
            null as unknown as ScheduleEvent[] | null,
        );
        if (cached) {
            this.transferState.remove(this.STATE_KEY);
            this.events$ = of(cached).pipe(shareReplay(1));
            return this.events$;
        }

        this.events$ = this.http
            .get<ScheduleEvent[]>(`${this.apiUrl}/schedule-events`)
            .pipe(
                tap((list) => {
                    if (isPlatformServer(this.platformId)) {
                        this.transferState.set(this.STATE_KEY, list);
                    }
                }),
                shareReplay(1),
            );
        return this.events$;
    }
}

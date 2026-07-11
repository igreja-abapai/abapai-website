import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { LiveService, YoutubeLiveCurrent } from '../services/live.service';

const EMPTY_LIVE: YoutubeLiveCurrent = {
    isLive: false,
    liveVideo: null,
    upcoming: [],
    nextScheduledAt: null,
    syncedAt: null,
};

export const liveResolver: ResolveFn<YoutubeLiveCurrent> = () => {
    const service = inject(LiveService);
    return service.getCurrent().pipe(catchError(() => of(EMPTY_LIVE)));
};

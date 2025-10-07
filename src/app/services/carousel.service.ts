import {
    Injectable,
    inject,
    PLATFORM_ID,
    TransferState,
    makeStateKey,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../shared/environments/environment';

export interface CarouselImage {
    id: number;
    imageUrl: string;
    linkUrl?: string;
    position: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

@Injectable({
    providedIn: 'root',
})
export class CarouselService {
    private http = inject(HttpClient);
    private transferState = inject(TransferState);
    private platformId = inject(PLATFORM_ID);
    private apiUrl = environment.clientApiBaseUrl;
    private STATE_KEY = makeStateKey<CarouselImage[]>('carousel_images');

    private images$?: Observable<CarouselImage[]>;

    getImages(): Observable<CarouselImage[]> {
        if (this.images$) return this.images$;

        const cached = this.transferState.get(
            this.STATE_KEY,
            null as unknown as CarouselImage[] | null,
        );
        if (cached) {
            this.transferState.remove(this.STATE_KEY);
            this.images$ = of(cached).pipe(shareReplay(1));
            return this.images$;
        }

        this.images$ = this.http
            .get<CarouselImage[]>(`${this.apiUrl}/carousel-images`)
            .pipe(
                tap((images) => {
                    if (isPlatformServer(this.platformId)) {
                        this.transferState.set(this.STATE_KEY, images);
                    }
                }),
                shareReplay(1),
            );
        return this.images$;
    }
}

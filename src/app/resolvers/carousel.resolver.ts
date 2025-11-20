import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { CarouselImage, CarouselService } from '../services/carousel.service';
import { catchError, of } from 'rxjs';

export const carouselResolver: ResolveFn<CarouselImage[]> = () => {
    const service = inject(CarouselService);
    return service.getImages().pipe(
        catchError(() => {
            // Return empty array if API call fails, so fallback image can be shown
            return of([]);
        }),
    );
};


import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { CarouselImage, CarouselService } from '../services/carousel.service';

export const carouselResolver: ResolveFn<CarouselImage[]> = () => {
    const service = inject(CarouselService);
    return service.getImages();
};


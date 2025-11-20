import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselImage, CarouselService } from '../../../services/carousel.service';

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent implements OnInit {
    images: CarouselImage[] = [];

    loading = true;

    error = '';

    private route = inject(ActivatedRoute);

    private carouselService = inject(CarouselService);

    private dragStartTime = 0;

    private dragStartX = 0;

    private dragStartY = 0;

    private isDragging = false;

    ngOnInit(): void {
        // Check if data was resolved during SSR
        const resolved = this.route.snapshot.data['carouselImages'] as
            | CarouselImage[]
            | undefined;
        if (resolved !== undefined) {
            this.images = resolved || [];
            this.loading = false;
        } else {
            this.loadCarouselImages();
        }
    }

    private loadCarouselImages(): void {
        this.carouselService.getImages().subscribe({
            next: (images) => {
                this.images = images || [];
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading carousel images:', err);
                // Set empty array to show fallback image
                this.images = [];
                this.loading = false;
            },
        });
    }

    onImageMouseDown(image: CarouselImage, event: MouseEvent): void {
        this.dragStartTime = Date.now();
        this.dragStartX = event.clientX;
        this.dragStartY = event.clientY;
        this.isDragging = false;
    }

    onImageTouchStart(image: CarouselImage, event: TouchEvent): void {
        this.dragStartTime = Date.now();
        this.dragStartX = event.touches[0].clientX;
        this.dragStartY = event.touches[0].clientY;
        this.isDragging = false;
    }

    onImageMouseUp(image: CarouselImage, event: MouseEvent): void {
        this.handleClickOrDrag(image, event.clientX, event.clientY);
    }

    onImageTouchEnd(image: CarouselImage, event: TouchEvent): void {
        if (event.changedTouches.length > 0) {
            this.handleClickOrDrag(
                image,
                event.changedTouches[0].clientX,
                event.changedTouches[0].clientY,
            );
        }
    }

    private handleClickOrDrag(image: CarouselImage, endX: number, endY: number): void {
        const dragDuration = Date.now() - this.dragStartTime;
        const dragDistance = Math.sqrt(
            Math.pow(endX - this.dragStartX, 2) + Math.pow(endY - this.dragStartY, 2),
        );

        // Consider it a click if:
        // 1. Duration is less than 300ms (quick interaction)
        // 2. Distance moved is less than 10px (minimal movement)
        // 3. Not already detected as dragging
        const isClick = dragDuration < 300 && dragDistance < 10 && !this.isDragging;

        if (isClick && image && image.linkUrl) {
            this.openLink(image.linkUrl);
        }
    }

    openLink(url: string): void {
        if (url) {
            window.open(url, '_blank');
        }
    }
}

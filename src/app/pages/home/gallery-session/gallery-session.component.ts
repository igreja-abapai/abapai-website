import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-gallery-session',
    standalone: true,
    imports: [],
    templateUrl: './gallery-session.component.html',
    styleUrls: ['./gallery-session.component.scss'],
})
export class GallerySessionComponent {
    @ViewChild('galleryRef') galleryRef!: ElementRef;

    images = [
        '../assets/igreja9.jpg',
        '../assets/igreja2.jpg',
        '../assets/igreja3.jpg',
        '../assets/igreja4.jpg',
        '../assets/igreja5.jpg',
        '../assets/igreja6.jpg',
        '../assets/igreja7.jpg',
        '../assets/igreja8.jpg',
    ];
}

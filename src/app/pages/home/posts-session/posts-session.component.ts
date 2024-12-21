import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-posts-session',
    standalone: true,
    imports: [],
    templateUrl: './posts-session.component.html',
    styleUrls: ['./posts-session.component.scss'],
})
export class PostsSessionComponent {
    @ViewChild('postsRef') postsRef!: ElementRef;

    images = [
        '../assets/igreja1.jpg',
        '../assets/igreja2.jpg',
        '../assets/igreja3.jpg',
        '../assets/igreja4.jpg',
        '../assets/igreja5.jpg',
        '../assets/igreja6.jpg',
        '../assets/igreja7.jpg',
        '../assets/igreja8.jpg',
    ];
}

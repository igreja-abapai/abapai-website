import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'app-app-download-session',
    standalone: true,
    imports: [],
    templateUrl: './app-download-session.component.html',
    styleUrl: './app-download-session.component.scss',
})
export class AppDownloadSessionComponent {
    @Input() appDownloadRef!: ElementRef;

    androidImage = 'assets/download-android.png';

    iosImage = 'assets/download-ios.png';
}

import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'app-donations-session',
    standalone: true,
    imports: [],
    templateUrl: './donations-session.component.html',
    styleUrl: './donations-session.component.scss',
})
export class DonationsSessionComponent {
    @Input() donationsRef!: ElementRef;
}

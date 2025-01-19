import { Component, ElementRef, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-donations-session',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './donations-session.component.html',
    styleUrl: './donations-session.component.scss',
})
export class DonationsSessionComponent {
    @Input() donationsRef!: ElementRef;
}

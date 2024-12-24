import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    faFacebookF = faFacebookF;
    faInstagram = faInstagram;
    faYoutube = faYoutube;
}

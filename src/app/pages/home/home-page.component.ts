import { Component } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { PrayerSessionComponent } from "./prayer-session/prayer-session.component";
import { WeeklyMessageComponent } from './weekly-message-session/weekly-message-session.component';
import { PostsSessionComponent } from './posts-session/posts-session.component';
import { DonationsSessionComponent } from './donations-session/donations-session.component';
import { AppDownloadSessionComponent } from './app-download-session/app-download-session.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CarouselComponent, WeeklyMessageComponent, PrayerSessionComponent, PostsSessionComponent, DonationsSessionComponent, AppDownloadSessionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}

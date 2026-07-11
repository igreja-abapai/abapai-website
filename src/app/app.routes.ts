import { Routes } from '@angular/router';
import { websiteSettingsResolver } from './resolvers/website-settings.resolver';
import { scheduleResolver } from './resolvers/schedule.resolver';
import { carouselResolver } from './resolvers/carousel.resolver';
import { liveResolver } from './resolvers/live.resolver';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/home/home-page.component').then(
                (mod) => mod.HomePageComponent,
            ),
        resolve: {
            carouselImages: carouselResolver,
        },
    },
    {
        path: 'ofertas',
        loadComponent: () =>
            import('./pages/donations/donations-page.component').then(
                (mod) => mod.DonationsPageComponent,
            ),
        resolve: {
            websiteSettings: websiteSettingsResolver,
        },
    },
    {
        path: 'programacao',
        loadComponent: () =>
            import('./pages/schedule/schedule-page.component').then(
                (mod) => mod.SchedulePageComponent,
            ),
        resolve: { schedule: scheduleResolver },
    },
    {
        path: 'pedido-de-oracao',
        loadComponent: () =>
            import('./pages/prayer/prayer-page.component').then(
                (mod) => mod.PrayerPageComponent,
            ),
    },
    {
        path: 'ao-vivo',
        loadComponent: () =>
            import('./pages/live/live-page.component').then((mod) => mod.LivePageComponent),
        resolve: { live: liveResolver },
    },
    {
        path: 'sobre-nos',
        loadComponent: () =>
            import('./pages/about/about-page.component').then(
                (mod) => mod.AboutPageComponent,
            ),
        resolve: {
            websiteSettings: websiteSettingsResolver,
        },
    },
];

import { Routes } from '@angular/router';
import { websiteSettingsResolver } from './resolvers/website-settings.resolver';
import { scheduleResolver } from './resolvers/schedule.resolver';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/home/home-page.component').then(
                (mod) => mod.HomePageComponent,
            ),
    },
    {
        path: 'ofertas',
        loadComponent: () =>
            import('./pages/donations/donations-page.component').then(
                (mod) => mod.DonationsPageComponent,
            ),
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

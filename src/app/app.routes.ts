import { Routes } from '@angular/router';

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
];

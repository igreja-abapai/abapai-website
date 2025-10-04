import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    RouterOutlet,
    Router,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError,
    ResolveStart,
    ResolveEnd,
} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'abapai-website';

    isLoading = false;

    loadingProgress = 0;

    private destroy$ = new Subject<void>();

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.isLoading = true;
                this.loadingProgress = 0;
                this.simulateProgress();
            } else if (event instanceof ResolveStart) {
                this.loadingProgress = 30;
            } else if (event instanceof ResolveEnd) {
                this.loadingProgress = 80;
            } else if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                this.loadingProgress = 100;
                setTimeout(() => {
                    this.isLoading = false;
                }, 200);
            }
        });
    }

    private simulateProgress() {
        const interval = setInterval(() => {
            if (this.loadingProgress < 30) {
                this.loadingProgress += Math.random() * 10;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

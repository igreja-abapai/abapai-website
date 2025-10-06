import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScheduleEvent } from '../../services/schedule.service';

@Component({
    selector: 'app-schedule',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './schedule-page.component.html',
    styleUrl: './schedule-page.component.scss',
})
export class SchedulePageComponent implements OnInit {
    events: ScheduleEvent[] = [];
    
    private route = inject(ActivatedRoute);

    ngOnInit(): void {
        const resolved = this.route.snapshot.data['schedule'] as
            | ScheduleEvent[]
            | undefined;
        this.events = (resolved ?? [])
            .slice()
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    }
}

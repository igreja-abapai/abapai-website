import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ScheduleEvent, ScheduleService } from '../services/schedule.service';

export const scheduleResolver: ResolveFn<ScheduleEvent[]> = () => {
    const service = inject(ScheduleService);
    return service.getEvents();
};

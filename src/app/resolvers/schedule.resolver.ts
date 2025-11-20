import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ScheduleEvent, ScheduleService } from '../services/schedule.service';
import { catchError, of } from 'rxjs';

const FALLBACK_SCHEDULE_EVENTS: ScheduleEvent[] = [
    {
        id: 1,
        name: 'Culto Matutino',
        time: '6H00',
        days: 'Segunda à sexta',
        position: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        name: 'Culto do Poder de Deus',
        time: '19H00',
        days: 'Quarta-feira',
        position: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 3,
        name: 'Devocional de Consagração',
        time: '9H00',
        days: 'Sábado de manhã',
        position: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 4,
        name: 'Círculo de Oração',
        time: '19H00',
        days: 'Sábado à noite',
        position: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 5,
        name: 'Escola Bíblica Dominical',
        time: '10H00',
        days: 'Domingo de manhã',
        position: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 6,
        name: 'Culto Graça Viva',
        time: '18H00',
        days: 'Domingo à noite',
        position: 6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export const scheduleResolver: ResolveFn<ScheduleEvent[]> = () => {
    const service = inject(ScheduleService);
    return service.getEvents().pipe(
        catchError(() => {
            // Return fallback schedule events if API call fails
            return of(FALLBACK_SCHEDULE_EVENTS);
        }),
    );
};

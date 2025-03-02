import { Injectable } from '@angular/core';
import { BaseRepository } from '../../shared';
import { PrayerRequest } from './prayer-request.entity';

type PrayerRequestDto = Omit<PrayerRequest, 'id' | 'createdAt' | 'updatedAt'>;

@Injectable()
export class PrayerRequestRepository extends BaseRepository<PrayerRequest> {
    constructor() {
        super('/prayer-request');
    }

    createPrayerRequest(prayerRequest: PrayerRequestDto) {
        return this.httpClient.post<PrayerRequest>(this.endpointUrl, prayerRequest);
    }
}

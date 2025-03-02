import { IdTimestampsEntity } from '../../shared';

export class PrayerRequest extends IdTimestampsEntity {
    name?: string;

    phone?: string;

    area?: string;

    request?: string;
}

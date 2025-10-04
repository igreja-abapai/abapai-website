import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../shared/environments/environment';

export interface WebsiteSettings {
    id: number;
    churchName: string;
    address: string;
    phone: string;
    email: string;
    facebook: string;
    instagram: string;
    youtube: string;
    about: string;
    serviceTimes: string;
    welcomeMessage: string;
    aboutWhoWeAre: string;
    aboutOurMission: string;
    aboutOurValues: string;
    isActive: boolean;
    maintenanceMode: boolean;
    createdAt: string;
    updatedAt: string;
}

@Injectable({
    providedIn: 'root',
})
export class WebsiteSettingsService {
    private http = inject(HttpClient);
    
    private apiUrl = environment.clientApiBaseUrl;

    getSettings(): Observable<WebsiteSettings> {
        return this.http.get<WebsiteSettings>(`${this.apiUrl}/website/settings`);
    }
}


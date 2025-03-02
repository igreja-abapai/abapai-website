import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
//import { LocalStorageService } from '@shared/util/local-storage.service';
import { map } from 'rxjs';
import { HttpFilter, HttpFilterProps, Page } from './http';
import { environment } from './environments/environment';

type Dto<K> = Omit<K, 'id' | 'createdAt' | 'updatedAt'>;

export abstract class BaseRepository<T> {
  protected readonly httpClient = inject(HttpClient);

  protected readonly endpointUrl: string;

  // private readonly localStorageService = inject(LocalStorageService);

  constructor(endpoint: string) {
    this.endpointUrl = endpoint.startsWith('/')
      ? environment.clientApiBaseUrl.concat(endpoint)
      : environment.clientApiBaseUrl.concat('/').concat(endpoint);
  }

   private getToken() {
    // const token = this.localStorageService.getAccessToken();
    const token = ''
     return `Bearer ${token ?? ''}`;
   }

  create(data: Dto<T>, filter?: HttpFilterProps<T>) {
    return this.httpClient.post<T>(this.endpointUrl, data, {
      headers: this.getHeaders(),
      params: this.getParams(filter),
    });
  }

  createBatch(data: Dto<T>[], filter?: HttpFilterProps<T>) {
    return this.httpClient.post<T>(`${this.endpointUrl}/batch`, data, {
      headers: this.getHeaders(),
      params: this.getParams(filter),
    });
  }

  list(filter?: HttpFilterProps<T>) {
    return this.httpClient
      .get<T[]>(this.endpointUrl, {
        headers: this.getHeaders(),
        observe: 'response',
        params: this.getParams(filter),
      })
      .pipe(
        map((response) => {
          return Page.fromHttpResponse(response);
        }),
      );
  }

  getById(id: number, filter?: HttpFilterProps<T>) {
    return this.httpClient.get<T>(`${this.endpointUrl}/${id}`, {
      headers: this.getHeaders(),
      params: this.getParams(filter),
    });
  }

  get(endpoint: string, filter?: HttpFilterProps<T>) {
    return this.httpClient.get<T>(`${this.endpointUrl}/${endpoint}`, {
      headers: this.getHeaders(),
      params: this.getParams(filter),
    });
  }

  patch(id: number, data: Partial<Dto<T>>, filter?: HttpFilterProps<T>) {
    return this.httpClient.patch<T>(`${this.endpointUrl}/${id}`, data, {
      headers: this.getHeaders(),
      params: this.getParams(filter),
    });
  }

  delete(id: number, filter?: HttpFilterProps<T>) {
    return this.httpClient.delete<T>(`${this.endpointUrl}/${id}`, {
      headers: this.getHeaders(),
      params: this.getParams(filter),
    });
  }

  protected getHeaders() {
    return {
      Authorization: this.getToken(),
    };
  }

  protected getParams(filter?: HttpFilterProps<T>) {
    return filter ? new HttpFilter(filter).toParams() : new HttpParams();
  }
}

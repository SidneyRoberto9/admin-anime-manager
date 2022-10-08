import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimeApiService {
  constructor(private http: HttpClient) {}

  getAnimes() {
    return this.http.get(`${environment.apiUrl}/animes`);
  }
}

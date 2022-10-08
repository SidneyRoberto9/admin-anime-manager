import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { AnimeModel } from '../models/anime.model';

@Injectable({
  providedIn: 'root',
})
export class AnimeApiService {
  constructor(private http: HttpClient) {}

  getAnimes() {
    return this.http.get<AnimeModel[]>(`${environment.apiUrl}/animes`);
  }

  editAnime(anime: AnimeModel) {
    return this.http.put<AnimeModel>(`${environment.apiUrl}/animes`, anime);
  }

  changeAiringAnime(id: string) {
    return this.http.get<AnimeModel>(`${environment.apiUrl}/airing/${id}`);
  }

  addAnime(anime: AnimeModel) {
    return this.http.post<AnimeModel>(`${environment.apiUrl}/animes`, anime);
  }
}

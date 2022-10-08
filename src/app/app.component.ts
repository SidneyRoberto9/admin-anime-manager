import { Component, OnInit } from '@angular/core';

import { AnimeApiService } from './Services/anime-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'animes-calendar';

  constructor(private animeApiService: AnimeApiService) {}

  ngOnInit() {
    this.animeApiService.getAnimes().subscribe((animes) => {
      console.log(animes);
    });
  }
}

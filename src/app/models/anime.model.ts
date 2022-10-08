export interface AnimeCreationDto {
  title: string;
  image: string;
  date: animeDate;
  external: string[];
}

export interface AnimeModel {
  _id?: string;
  title: string;
  image: string;
  date: animeDate;
  external: string[];
}

export interface IAnime {
  _id?: string;
  title: string;
  image: string;
  airing: boolean;
  day: string;
  year: string;
  season: string;
  external: string[];
}

export interface animeDate {
  airing: boolean;
  day: string;
  year: string;
  season: string;
}

export interface AnimeDay {
  day: string;
  animes: AnimeModel[];
}

export interface select {
  name: string;
  code: string | boolean;
}

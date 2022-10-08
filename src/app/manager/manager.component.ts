import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AnimeModel, IAnime, select } from '../models/anime.model';
import { AnimeApiService } from '../Services/anime-api.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  AnimesData: IAnime[];
  AnimeAdd: IAnime;
  Anime: IAnime;

  airing: select[];
  week: select[];

  AnimeAddExternal: string;

  animeModal: boolean;
  animeAddModal: boolean;
  submitted: boolean;

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private animeApiService: AnimeApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllAnimes();

    this.airing = [
      { name: 'Sim', code: true },
      { name: 'Não', code: false },
    ];

    this.week = [
      { name: 'Domingo', code: 'domingo' },
      { name: 'Segunda', code: 'segunda' },
      { name: 'Terça', code: 'terca' },
      { name: 'Quarta', code: 'quarta' },
      { name: 'Quinta', code: 'quinta' },
      { name: 'Sexta', code: 'sexta' },
      { name: 'Sábado', code: 'sabado' },
    ];
  }

  getAllAnimes() {
    this.animeApiService.getAnimes().subscribe((animes) => {
      this.AnimesData = animes.map((anime) => {
        return {
          _id: anime._id,
          title: anime.title,
          image: anime.image,
          airing: anime.date.airing,
          day: anime.date.day,
          year: anime.date.year,
          season: anime.date.season,
          external: anime.external,
        };
      });
    });
  }

  openNew() {
    this.AnimeAdd = {} as IAnime;
    this.AnimeAddExternal = '';
    this.submitted = false;
    this.animeAddModal = true;
  }

  editAnime(anime: IAnime) {
    this.Anime = { ...anime };
    this.animeModal = true;
  }

  changeAiringAnime(anime: IAnime) {
    this.animeApiService.changeAiringAnime(anime._id).subscribe({
      next: (data) => console.log(data),
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao Mudar status de anime',
          life: 3000,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Status editado com sucesso',
          life: 3000,
        });
        this.getAllAnimes();
      },
    });
  }

  hideModal() {
    this.animeModal = false;
    this.submitted = false;
  }

  hideAddModal() {
    this.animeAddModal = false;
    this.submitted = false;
  }

  addAnime() {
    const externalArray = [];

    if (this.AnimeAddExternal.search(',') === -1) {
      externalArray.push(this.AnimeAddExternal);
    } else {
      this.AnimeAddExternal.split(',').forEach((external) => {
        externalArray.push(external);
      });
    }

    const addAnime: any = {
      title: this.AnimeAdd.title,
      airing: this.AnimeAdd.airing,
      day: this.AnimeAdd.day,
      link: externalArray,
    };

    this.animeApiService.addAnime(addAnime).subscribe({
      next: (data) => console.log(data),
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao adicionar anime',
          life: 3000,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Anime adicionado com sucesso',
          life: 3000,
        });
        this.getAllAnimes();
        this.animeAddModal = false;
      },
    });
  }

  saveEditedAnime() {
    this.submitted = true;
    console.log(this.Anime);

    const editedAnime: AnimeModel = {
      title: this.Anime.title,
      image: this.Anime.image,
      date: {
        airing: this.Anime.airing,
        day: this.Anime.day,
        year: this.Anime.year,
        season: this.Anime.season,
      },
      external: this.Anime.external,
    };

    this.animeApiService.editAnime(editedAnime).subscribe({
      next: (data) => console.log(data),
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao editar anime',
          life: 3000,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Anime editado com sucesso',
          life: 3000,
        });
        this.getAllAnimes();
        this.animeModal = false;
      },
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.AnimesData.length; i++) {
      if (this.AnimesData[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}

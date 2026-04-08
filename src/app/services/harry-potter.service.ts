import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Character } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class HarryPotterService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://hp-api.onrender.com/api';

  getCharacters(): Observable<Character[]> {
    return this.http
      .get<Character[]>(`${this.apiUrl}/characters`)
      .pipe(map((characters) => characters.map((character) => this.normalizeCharacter(character))));
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    return this.http
      .get<Character[]>(`${this.apiUrl}/characters/house/${encodeURIComponent(house)}`)
      .pipe(map((characters) => characters.map((character) => this.normalizeCharacter(character))));
  }

  getCharacterById(id: string): Observable<Character | undefined> {
    return this.http
      .get<Character[]>(`${this.apiUrl}/character/${id}`)
      .pipe(map((characters) => this.normalizeCharacter(characters[0])));
  }

  private normalizeCharacter(character?: Character): Character {
    return {
      id: character?.id ?? '',
      name: character?.name ?? 'Unknown character',
      species: character?.species ?? 'Unknown',
      house: character?.house ?? '',
      wizard: character?.wizard ?? false,
      ancestry: character?.ancestry ?? 'Unknown',
      actor: character?.actor ?? 'Unknown',
      image: character?.image ?? '',
      dateOfBirth: character?.dateOfBirth ?? '',
      patronus: character?.patronus ?? '',
      wand: {
        wood: character?.wand?.wood ?? 'Unknown',
        core: character?.wand?.core ?? 'Unknown',
        length: character?.wand?.length ?? null,
      },
    };
  }
}

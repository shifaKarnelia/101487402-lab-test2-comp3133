import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Character } from '../../models/character';
import { HarryPotterService } from '../../services/harry-potter.service';
import { CharacterfilterComponent } from '../characterfilter/characterfilter';

@Component({
  selector: 'app-characterlist',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    CharacterfilterComponent,
  ],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterlistComponent implements OnInit {
  private readonly harryPotterService = inject(HarryPotterService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly selectedHouse = signal('All Houses');
  readonly characters = signal<Character[]>([]);

  ngOnInit(): void {
    this.loadCharacters();
  }

  onHouseChange(house: string): void {
    this.selectedHouse.set(house);
    this.loadCharacters();
  }

  showDetails(characterId: string): void {
    this.router.navigate(['/characters', characterId]);
  }

  trackByCharacterId(_: number, character: Character): string {
    return character.id;
  }

  private loadCharacters(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const request =
      this.selectedHouse() === 'All Houses'
        ? this.harryPotterService.getCharacters()
        : this.harryPotterService.getCharactersByHouse(this.selectedHouse());

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (characters) => {
        this.characters.set(characters);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load Harry Potter characters right now.');
        this.characters.set([]);
        this.isLoading.set(false);
      },
    });
  }
}

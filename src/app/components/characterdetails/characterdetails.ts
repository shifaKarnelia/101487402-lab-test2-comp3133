import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Character } from '../../models/character';
import { HarryPotterService } from '../../services/harry-potter.service';

@Component({
  selector: 'app-characterdetails',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatDividerModule, MatProgressSpinnerModule],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterdetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly harryPotterService = inject(HarryPotterService);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly character = signal<Character | undefined>(undefined);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get('id') ?? '';
      this.loadCharacter(id);
    });
  }

  private loadCharacter(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.harryPotterService
      .getCharacterById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (character) => {
          this.character.set(character);
          this.isLoading.set(false);
        },
        error: () => {
          this.character.set(undefined);
          this.errorMessage.set('Unable to load that character profile.');
          this.isLoading.set(false);
        },
      });
  }
}

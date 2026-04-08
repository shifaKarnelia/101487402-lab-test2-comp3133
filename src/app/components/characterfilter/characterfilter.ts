import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-characterfilter',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatOptionModule, MatSelectModule],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterfilterComponent {
  readonly label = input('Filter by House');
  @Output() readonly houseChange = new EventEmitter<string>();

  readonly houseControl = new FormControl('All Houses', { nonNullable: true });
  readonly houses = ['All Houses', 'Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];

  onSelectionChange(house: string): void {
    this.houseChange.emit(house);
  }
}

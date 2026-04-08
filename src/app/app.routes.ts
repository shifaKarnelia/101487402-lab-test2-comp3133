import { Routes } from '@angular/router';

import { CharacterdetailsComponent } from './components/characterdetails/characterdetails';
import { CharacterlistComponent } from './components/characterlist/characterlist';

export const routes: Routes = [
  {
    path: '',
    component: CharacterlistComponent,
    title: 'Character List',
  },
  {
    path: 'characters/:id',
    component: CharacterdetailsComponent,
    title: 'Character Details',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

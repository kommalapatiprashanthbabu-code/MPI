import { Routes } from '@angular/router';
import { Members } from './members/members';
import { Scanner } from './scanner/scanner';
import { Home } from './home/home';

export const routes: Routes = [
     {
    path: '',
    component:Home
     },
      {
    path: 'members',
    component:Members
     },
     {path:'scan',component:Scanner}
];

import { Routes } from '@angular/router';
import { Members } from './members/members';
import { Scanner } from './scanner/scanner';
import { Home } from './home/home';
import { MembersAttended } from './members-attended/members-attended';

export const routes: Routes = [
     {
          path: '',
          component: Home
     },
     {
          path: 'members',
          component: Members
     },
     {
          path: 'attended-members',
          component: MembersAttended
     },
     { path: 'scan', component: Scanner }
];

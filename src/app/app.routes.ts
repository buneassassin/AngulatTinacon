import { Routes } from '@angular/router';
import { ProfileComponent } from './view/profile/profile.component';
import { HomeComponent } from './view/home/home.component';
//import { NotFoundComponent } from './view/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'perfil',
    component: ProfileComponent,
  },
  /*{
    path: '**',
    component: NotFoundComponent,
  }*/
];

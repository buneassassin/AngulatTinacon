import { Routes } from '@angular/router';
import { ProfileComponent } from './view/profile/profile.component';
import { HomeComponent } from './view/home/home.component';
import { TinacoComponent } from './view/Tinacon/tinaco.component';
import { LoginComponent } from './view/auth/login/login.component';
import { RegisterComponent } from './view/auth/register/register.component';
import { InfoComponent } from './view/info/info.component';
import { HomeAdminComponent } from './view/admin/home-admin/home-admin.component';
import { UserAdminComponent } from './view/admin/user-admin/user-admin.component';
import { GraficasAdminComponent } from './view/admin/graficas-admin/graficas-admin.component';
import { TinacosAdminComponent } from './view/admin/tinacos-admin/tinacos-admin.component';
import { NotFoundComponent } from './view/not-found/not-found.component';

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
  {
    path: 'tinaco',
    component: TinacoComponent,
  },
  {
    path: 'informacion',
    component: InfoComponent,
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: HomeAdminComponent,
  },
  {
    path: 'admin/user',
    component: UserAdminComponent,
  },
  {
    path: 'admin/tinacos',
    component: TinacosAdminComponent,
  },
  {
    path: 'admin/graficas',
    component: GraficasAdminComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

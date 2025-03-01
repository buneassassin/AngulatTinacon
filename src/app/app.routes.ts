import { Routes } from '@angular/router';
import { ProfileComponent } from './view/profile/profile.component';
import { HomeComponent } from './view/home/home.component';
import { TinacoComponent } from './view/Tinacon/tinaco.component';
import { TinacoIndivComponent } from './view/Tinacon/tinaco-indiv/tinaco-indiv.component';
import { NotificacionComponent } from './view/notificacion/notificacion.component';
import { NotificacionIndivComponent } from './view/notificacion/notificacion-indiv/notificacion-indiv.component';
import { LoginComponent } from './view/auth/login/login.component';
import { RegisterComponent } from './view/auth/register/register.component';
import { RecuperarComponent } from './view/auth/recuperar/recuperar.component';
import { InfoComponent } from './view/info/info.component';
import { HomeAdminComponent } from './view/admin/home-admin/home-admin.component';
import { UserAdminComponent } from './view/admin/user-admin/user-admin.component';
import { GraficasAdminComponent } from './view/admin/graficas-admin/graficas-admin.component';
import { TinacosAdminComponent } from './view/admin/tinacos-admin/tinacos-admin.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { ExitGuard } from './Guards/exit.guard';

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
    canDeactivate: [ExitGuard]
  },
  {
    path: 'tinaco',
    component: TinacoComponent,
  },
  {
    path: 'tinaco/:id',
    component: TinacoIndivComponent,
  },
  {
    path: 'informacion',
    component: InfoComponent,
  },
  {
    path: 'notificaciones',
    component: NotificacionComponent,
  },
  {
    path: 'notificaciones/:id',
    component: NotificacionIndivComponent,
  },
  {
    path:'login',
    component: LoginComponent,
    canDeactivate: [ExitGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [ExitGuard]
  },
  {
    path: 'recuperar',
    component: RecuperarComponent,
    canDeactivate: [ExitGuard] 
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

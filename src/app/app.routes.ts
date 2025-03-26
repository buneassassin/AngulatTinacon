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
import { NotificacionAdminComponent } from './view/admin/notificacion-admin/notificacion-admin.component';
import { GraficasAdminComponent } from './view/admin/graficas-admin/graficas-admin.component';
import { TinacosAdminComponent } from './view/admin/tinacos-admin/tinacos-admin.component';
import { TinacoDetalleComponent } from './view/admin/tinacos-admin/tinaco-detalle/tinaco-detalle.component';
import { TinacoSensorComponent } from './view/admin/tinacos-admin/tinaco-detalle/tinaco-sensor/tinaco-sensor.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { ExitGuard } from './Guards/exit.guard';
import { authGuard } from './Guards/auth/auth/auth.guard';
import { noAuthGuard } from './Guards/auth/no_auth/no-auth.guard';
import { adminAuthGuard } from './Guards/admin/admin-auth.guard';
import { PruebasComponent } from './view/pruebas/pruebas.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canDeactivate: [ExitGuard],
    canActivate: [noAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [ExitGuard],
    canActivate: [noAuthGuard],
  },
  {
    path: 'recuperar',
    component: RecuperarComponent,
    canDeactivate: [ExitGuard],
    canActivate: [noAuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { public: true }
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    canDeactivate: [ExitGuard],
    canActivate: [authGuard],
  },
  {
    path: 'tinaco',
    component: TinacoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'tinaco/:id',
    component: TinacoIndivComponent,
    canActivate: [authGuard],

  },
  {
    path: 'informacion',
    component: InfoComponent,
    canActivate: [authGuard],
    data: { public: true }
  },
  {
    path: 'notificaciones',
    component: NotificacionComponent,
    canActivate: [authGuard],
    
  },
  {
    path: 'notificaciones/:id',
    component: NotificacionIndivComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: HomeAdminComponent,
    canActivate: [authGuard, adminAuthGuard],
  },
  {
    path: 'admin/user',
    component: UserAdminComponent,
    canActivate: [authGuard, adminAuthGuard],
  },
  {
    path: 'admin/tinacos',
    component: TinacosAdminComponent,
    canActivate: [authGuard, adminAuthGuard],
  },
  {
    path: 'admin/tinacos/:id',
    component: TinacoDetalleComponent,
    canActivate: [authGuard, adminAuthGuard],
  },{
    path: 'admin/tinacos/:id/sensor/:sensorId',
    component: TinacoSensorComponent,
    canActivate: [authGuard, adminAuthGuard],
  },
  {
    path: 'admin/notificaciones',
    component: NotificacionAdminComponent,
    canDeactivate: [ExitGuard],
    canActivate: [authGuard, adminAuthGuard],

  },
  {
    path: 'admin/graficas',
    component: GraficasAdminComponent,
    canActivate: [authGuard, adminAuthGuard],
  },
  { //PARA PROBAR COMPONENTES ANTES DE PONERLOS EN SU LUGAR
    path: 'pruebas',
    component: PruebasComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

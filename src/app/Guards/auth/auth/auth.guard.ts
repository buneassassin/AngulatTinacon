import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../../Services/auth/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  console.log('hola');
  const token = localStorage.getItem('token');
  console.log('authGuard: token', token, 'en ruta', state.url);

  // Si la ruta está marcada como pública, permitimos el acceso sin verificar el token
  if (route.data && route.data['public'] === true) {
    return of(true);
  }

  // Si la ruta no es pública y no existe token, redirige a login
  if (!token) {
    return of(router.createUrlTree(['/login']));
  }

  // Si hay token, se verifica su validez con el endpoint /me
  return authService.getUserData().pipe(
    map(response => {
      console.log('authGuard: response', response);
      return true;
    }),
    catchError(error => {
      console.log('authGuard: error', error);
      localStorage.removeItem('token');
      return of(router.createUrlTree(['/login']));
    })
  );
};

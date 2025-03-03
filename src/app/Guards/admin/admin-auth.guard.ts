import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminService } from '../../Services/admin/admin.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const adminService = inject(AdminService);
  
  // Se llama al endpoint que comprueba si es admin
  return adminService.isAdmin().pipe(
    map(response => {
      // Se asume que la respuesta tiene la propiedad "isAdmin" (true o false)
      if (response && response.success) {
        console.log('adminAuthGuard: user is admin');
        return true;  // Permite acceder a la ruta
      } else {
        console.log('adminAuthGuard: user is NOT admin, redirecting to /home');
        // Retorna un UrlTree para redirigir a /home
        return router.createUrlTree(['/home']);
      }
    }),
    // Si ocurre algún error, se redirige a /home
    catchError(err => {
      console.error('adminAuthGuard: error', err);
      return of(router.createUrlTree(['/home']));
    })
  );
};

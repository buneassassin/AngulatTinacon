
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const currentUrl = state.url;
  console.log('authGuard: token', token, 'en ruta', currentUrl);

  if (token   === null) {
    return router.navigate(['/login']);
  }
  
  return true;
};

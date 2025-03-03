
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (authService.isLoggedIn()) {
    return router.navigate(['/home']);
  }
  return true;
};

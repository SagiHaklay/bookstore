import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { map, take } from 'rxjs';

export const adminLoggedOutGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkIsAdmin().pipe(take(1), map((isAdmin) => {
    if (isAdmin) {
      
      return router.createUrlTree(['admin', 'dashboard']);
    }
    return true;
  }));
};

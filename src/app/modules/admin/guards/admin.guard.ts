import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { map, take } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.authService.checkIsAdmin().pipe(take(1), map((isAdmin) => {
      if (isAdmin) {
        return true;
      }
      return this.router.createUrlTree(['admin', 'login']);
    }));
  }
  
}

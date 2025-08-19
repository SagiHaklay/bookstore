import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanMatch {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    // console.log(route);
    // console.log(state);
    return this.guard(state.url === '/admin/dashboard');
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.guard();
  }
  private guard(isAdminAccess: boolean = false) {
    return this.authService.token.pipe(take(1), map((token) => {
      if (token === null) {
        if (isAdminAccess) {
          return this.router.createUrlTree(['admin', 'login']);
        }
        return this.router.createUrlTree(['user', 'login']);
      }
      return true;
    }));
  }
}

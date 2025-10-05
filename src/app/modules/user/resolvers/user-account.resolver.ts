import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserAccount } from '../models/user-account.model';
import { catchError, of } from 'rxjs';

export const userAccountResolver: ResolveFn<UserAccount> = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const userId = localStorage.getItem('userId') || '';
  return userService.getUser(userId).pipe(catchError((err) => {
    console.error(err);
    return of(new RedirectCommand(router.parseUrl('/notfound')));
  }));
};

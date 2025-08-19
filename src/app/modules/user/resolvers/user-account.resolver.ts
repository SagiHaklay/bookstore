import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserAccount } from '../models/user-account.model';

export const userAccountResolver: ResolveFn<UserAccount> = (route, state) => {
  const userService = inject(UserService);
  const userId = localStorage.getItem('userId') || '';
  return userService.getUser(userId);
};

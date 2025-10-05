import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`)
    });
  }
  return next(req).pipe(catchError((err: HttpErrorResponse) => {
    if (err.status === 401 || err.status === 422) {
      authService.logout();
      if (token) {
        router.navigate(['/user', 'login'], {
          queryParams: {expired: true}
        });
      }
      
    }
    return throwError(() => err);
  }));
};

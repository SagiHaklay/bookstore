import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`)
    });
  }
  return next(req);
};

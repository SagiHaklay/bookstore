import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Book } from '../models/book.model';
import { catchError, of } from 'rxjs';

export const productsResolver: ResolveFn<Book[]> = (route, state) => {
  const productService = inject(ProductService);
  const router = inject(Router);
  return productService.getProducts().pipe(catchError((err) => {
    console.error(err);
    return of(new RedirectCommand(router.parseUrl('/notfound')));
  }));
};

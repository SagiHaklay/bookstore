import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Book } from '../../../core/models/book.model';
import { catchError, of } from 'rxjs';

export const productInfoResolver: ResolveFn<Book | RedirectCommand> = (route, state) => {
  const productService = inject(ProductService);
  const router = inject(Router);
  const id = route.params['id'];
  return productService.getProductById(id).pipe(catchError((err) => {
    console.error(err);
    return of(new RedirectCommand(router.parseUrl('/notfound')));
  }));
};

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Book } from '../../../core/models/book.model';

export const productInfoResolver: ResolveFn<Book> = (route, state) => {
  const productService = inject(ProductService);
  const id = route.params['id'];
  return productService.getProductById(id);
};

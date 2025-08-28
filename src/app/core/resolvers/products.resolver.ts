import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Book } from '../models/book.model';

export const productsResolver: ResolveFn<Book[]> = (route, state) => {
  const productService = inject(ProductService);
  return productService.getProducts();
};

import { Injectable } from '@angular/core';
import { Book } from "../models/book.model";
import { BookData } from "../models/book-data.model";
import { map, Observable, of, throwError } from 'rxjs';


@Injectable()
export class ProductService {
  private _mockBooks: Book[] = [
    {
      id: '1',
      name: 'Lord of the Rings: Fellowship of the Ring',
      author: 'J. R. R. Tolkien',
      price: 50,
      discount: 10
    },
    {
      id: '2',
      name: "The Hitchhiker's Guide to the Galaxy",
      author: 'Douglas Adams',
      price: 42
    }
  ];
  constructor() { 
    // localStorage.setItem('products', JSON.stringify(this._mockBooks));
  }

  getProducts(): Observable<Book[]> {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    return of(products);
  }

  getProductById(id: string) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const bookById = products.find((book: any) => book.id === id);
    if (!bookById) {
      return throwError(() => new Error(`book with id ${id} not found`));
    }
    return of(bookById);
  }

  addProduct(data: BookData) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const newBook: Book = {
      id: `${products.length + 1}`,
      ...data
    };
    products.push(newBook);
    localStorage.setItem('products', JSON.stringify(products));
    return of(newBook);
  }
  updateProduct(id: string, data: BookData) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const index = products.findIndex((book: any) => book.id === id);
    if (index < 0) {
      return throwError(() => new Error(`book with id ${id} not found`));
    }
    products[index] = {
      ...products[index],
      ...data
    };
    localStorage.setItem('products', JSON.stringify(products));
    return of(products[index]);
  }
  deleteProduct(id: string) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const index = products.findIndex((book: any) => book.id === id);
    if (index < 0) {
      return throwError(() => new Error(`book with id ${id} not found`));
    }
    const [deleted] = products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    return of(deleted);
  }
}

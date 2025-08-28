import { Injectable } from '@angular/core';
import { Book } from "../models/book.model";
import { BookData } from "../models/book-data.model";
import { Observable, of, throwError } from 'rxjs';


@Injectable()
export class ProductService {
  private _mockBooks: Book[] = [
    {
      id: '1',
      name: 'Lord of the Rings: Fellowship of the Ring',
      author: 'J. R. R. Tolkien',
      price: 50,
      discount: 0.1
    },
    {
      id: '2',
      name: "The Hitchhiker's Guide to the Galaxy",
      author: 'Douglas Adams',
      price: 42
    }
  ];
  constructor() { }

  getProducts(): Observable<Book[]> {
    return of(this._mockBooks);
  }

  getProductById(id: string) {
    const bookById = this._mockBooks.find(book => book.id === id);
    if (!bookById) {
      return throwError(() => new Error(`book with id ${id} not found`));
    }
    return of(bookById);
  }

  addProduct(data: BookData) {
    const newBook: Book = {
      id: `${this._mockBooks.length + 1}`,
      ...data
    };
    this._mockBooks.push(newBook);
    return of(newBook);
  }
}

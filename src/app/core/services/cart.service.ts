import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class CartService {
  private _mockCart = [
    { 
      product: {
        id: '2',
        name: "The Hitchhiker's Guide to the Galaxy",
        author: 'Douglas Adams',
        price: 42
      },
      quantity: 1,
      userId: '2'
   }
  ];
  private _cartItems: CartItem[] = [];
  private _cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this._cartSubject.asObservable();
  constructor(private http: HttpClient) { }

  get guestCart() {
    return this._cartItems.slice();
  }
  getUserCart(userId: string) {
    // const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    // const userCart: CartItem[] = carts.filter((item: any) => item.userId === userId).map((item: any) => {
    //   return {
    //     product: item.product,
    //     quantity: item.quantity
    //   };
    // });
    // return of(userCart);
    return this.http.get<CartItem[]>(`${environment.apiUrl}/cart/${userId}`);
  }
  addToCart(cartItem: CartItem) {
    if (this._cartItems.findIndex((item) => item.product.id === cartItem.product.id) !== -1) {
      throw new Error('Product already in cart!');
    }
    this._cartItems.push(cartItem);
    this._cartSubject.next(this._cartItems.slice());
  }
  addToUserCart(userId: string, cartItem: CartItem) {
    // const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    // if (carts.findIndex((item: any) => item.product.id === cartItem.product.id) !== -1) {
    //   return throwError(() => new Error('Product already in cart!'));
    // }
    // carts.push({
    //   userId,
    //   ...cartItem
    // });
    // localStorage.setItem('carts', JSON.stringify(carts));
    // return of(cartItem);
    return this.http.post<CartItem>(`${environment.apiUrl}/cart/${userId}/add`, {
      productId: cartItem.product.id,
      quantity: cartItem.quantity
    }, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  clearCart() {
    this._cartItems = [];
    this._cartSubject.next([]);
  }
  placeOrder(userId: string) {
    // let carts = JSON.parse(localStorage.getItem('carts') || '[]');
    // carts = carts.filter((item: any) => item.userId !== userId);
    // localStorage.setItem('carts', JSON.stringify(carts));
    // return of({});
    return this.http.post(`${environment.apiUrl}/cart/${userId}/order`, {});
  }
  removeFromCart(productId: string) {
    const removeIndex = this._cartItems.findIndex((item) => item.product.id === productId);
    this._cartItems.splice(removeIndex, 1);
    this._cartSubject.next(this._cartItems.slice());
  }
  removeFromUserCart(userId: string, productId: string) {
    // const carts = JSON.parse(localStorage.getItem('carts') || '[]');
    // const removeIndex = carts.findIndex((item: any) => item.product.id === productId && item.userId === userId);
    // carts.splice(removeIndex, 1);
    // localStorage.setItem('carts', JSON.stringify(carts));
    // return this.getUserCart(userId);
    return this.http.delete<CartItem>(`${environment.apiUrl}/cart/${userId}/delete/${productId}`);
  }
  saveGuestCartToUser(userId: string) {
    // if (this._cartItems.length > 0) {
    //   let carts = JSON.parse(localStorage.getItem('carts') || '[]');
    //   carts = carts.filter((item: any) => item.userId !== userId);
    //   for (let cartItem of this._cartItems) {
    //     carts.push({
    //       userId,
    //       ...cartItem
    //     });
    //   }
    //   localStorage.setItem('carts', JSON.stringify(carts));
    //   this.clearCart();
    // }
    
    // return this.getUserCart(userId);
    if (this._cartItems.length === 0) return of([]);
    return this.http.post<CartItem[]>(`${environment.apiUrl}/cart/${userId}/addMany`, {
      cartItems: this._cartItems.map(item => {
        return {
          productId: item.product.id,
          quantity: item.quantity
        };
      })
    }, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}

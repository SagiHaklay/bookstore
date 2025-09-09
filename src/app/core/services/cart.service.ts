import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject, of, tap } from 'rxjs';

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
  constructor() { }

  get guestCart() {
    return this._cartItems.slice();
  }
  getUserCart(userId: string) {
    const userCart: CartItem[] = this._mockCart.filter((item) => item.userId === userId).map((item) => {
      return {
        product: item.product,
        quantity: item.quantity
      };
    });
    return of(userCart);
  }
  addToCart(cartItem: CartItem) {
    if (this._cartItems.findIndex((item) => item.product.id === cartItem.product.id) !== -1) {
      throw new Error('Product already in cart!');
    }
    this._cartItems.push(cartItem);
    this._cartSubject.next(this._cartItems.slice());
  }
  addToUserCart(userId: string, cartItem: CartItem) {
    this._mockCart.push({
      userId,
      ...cartItem
    });
    return of(cartItem);
  }
  clearCart() {
    this._cartItems = [];
    this._cartSubject.next([]);
  }
  placeOrder(userId: string) {
    this._mockCart = this._mockCart.filter((item) => item.userId !== userId);
    return of({});
  }
  removeFromCart(productId: string) {
    const removeIndex = this._cartItems.findIndex((item) => item.product.id === productId);
    this._cartItems.splice(removeIndex, 1);
    this._cartSubject.next(this._cartItems.slice());
  }
  removeFromUserCart(userId: string, productId: string) {
    const removeIndex = this._mockCart.findIndex((item) => item.product.id === productId && item.userId === userId);
    this._mockCart.splice(removeIndex, 1);
    return this.getUserCart(userId);
  }
  saveGuestCartToUser(userId: string) {
    this._mockCart = this._mockCart.filter((item) => item.userId !== userId);
    for (let cartItem of this._cartItems) {
      this._mockCart.push({
        userId,
        ...cartItem
      });
    }
    this.clearCart();
    return this.getUserCart(userId);
  }
}

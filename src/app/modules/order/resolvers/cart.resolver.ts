import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/models/cart-item.model';

export const cartResolver: ResolveFn<CartItem[]> = (route, state) => {
  const cartService = inject(CartService);
  const userId = localStorage.getItem('userId');
  if (userId) {
    return cartService.getUserCart(userId);
  }
  return cartService.guestCart;
};

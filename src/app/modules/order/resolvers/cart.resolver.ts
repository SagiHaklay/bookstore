import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/models/cart-item.model';
import { catchError, of } from 'rxjs';

export const cartResolver: ResolveFn<CartItem[]> = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);
  const userId = localStorage.getItem('userId');
  if (userId) {
    return cartService.getUserCart(userId).pipe(catchError((err) => {
      console.error(err);
      return of(new RedirectCommand(router.parseUrl('/notfound')));
    }));
  }
  return cartService.guestCart;
};

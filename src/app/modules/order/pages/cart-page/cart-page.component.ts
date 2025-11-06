import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../../../../core/models/cart-item.model';
import { AuthService } from '../../../../core/services/auth.service';
import { take, Subscription } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  standalone: false
})
export class CartPageComponent implements OnInit, OnDestroy {
  cart: CartItem[] = [];
  userId: string | null = null;
  showDialogBox = false;
  orderForm!: FormGroup;
  dialogBoxMessage: string = '';
  isYesNo = false;
  queryParamsSub!: Subscription;
  isRemove = false;
  removeIndex: number = -1;
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private cartService: CartService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.cart = data['cart'];
      for (let item of this.cart) {
        item.product.imageUrl = item.product.imageUrl? `${environment.apiUrl}/images/${item.product.imageUrl}` : 'noimage.jpeg';
      }
    });
	this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      if (params['cartSaveFailed']) {
		    this.isYesNo = false;
        this.dialogBoxMessage = 'Failed to save guest cart.';
        this.showDialogBox = true;
	    }
    });
    this.userId = localStorage.getItem('userId');
    this.orderForm = this.fb.group({});
    // this.authService.currentUserId.pipe(take(1)).subscribe((id) => {
    //   this.userId = id;
    // });
  }
  ngOnDestroy(): void {
    this.queryParamsSub.unsubscribe();
  }
  onCheckout() {
    if (this.userId === null) {
      this.isYesNo = true;
      this.dialogBoxMessage = 'You must be logged in to proceed with the order. Would you like to log in?';
      this.showDialogBox = true;
    } else {
      this.cartService.placeOrder(this.userId).subscribe({
        next: () => {
          this.router.navigate(['/order', 'summary']);
        },
        error: (err: Error) => {
          console.error(err);
          this.isYesNo = false;
          this.dialogBoxMessage = 'Failed to process order.';
          this.showDialogBox = true;
        }
      });
    }
  }
  getItemTotal(item: CartItem) {
    let total = item.product.price * item.quantity;
    if (item.product.discount) {
      total *= (100 - item.product.discount) / 100;
    }
    return total;
  }
  getOrderTotal() {
    return this.cart.map(this.getItemTotal).reduce((sum, curr) => sum + curr);
  }
  onConfirmLogin() {
    this.router.navigate(['/user', 'login'], {
      queryParams: {saveCart: true}
    });
  }
  onConfirm() {
    if (this.isRemove) {
      this.onRemoveCartItem(this.removeIndex);
    } else {
      if (this.userId === null) {
        this.onConfirmLogin();
      } else {
        this.onCheckout();
      }
    }
  }
  onClickRemove(index: number) {
    this.removeIndex = index;
    this.isRemove = true;
    this.isYesNo = true;
    this.dialogBoxMessage = 'Would you like to remove this item from the cart?';
    this.showDialogBox = true;
  }
  onClickCheckout() {
    this.isRemove = false;
    this.isYesNo = true;
    if (this.userId === null) {
      this.dialogBoxMessage = 'You must be logged in to proceed with the order. Would you like to log in?';
    } else {
      this.dialogBoxMessage = 'Would you like to order the current cart?';
    }
    
    this.showDialogBox = true;
  }
  onDialogBoxClose() {
    this.showDialogBox = false;
  }
  onRemoveCartItem(index: number) {
    if (this.userId !== null) {
      this.cartService.removeFromUserCart(this.userId, this.cart[index].product.id).subscribe({
        next: () => {
          this.cart.splice(index, 1);
        },
        error: (err: Error) => {
          this.isYesNo = false;
          this.dialogBoxMessage = 'Failed to remove item from cart.';
          this.showDialogBox = true;
        }
      });
    } else {
      this.cartService.removeFromCart(index);
	    this.cart = this.cartService.guestCart;
    }

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../../../../core/models/cart-item.model';
import { AuthService } from '../../../../core/services/auth.service';
import { take } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  cart: CartItem[] = [];
  userId: string | null = null;
  showDialogBox = false;
  orderForm!: FormGroup;
  dialogBoxMessage: string = '';
  isYesNo = false;
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private cartService: CartService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.cart = data['cart'];
    });
    this.userId = localStorage.getItem('userId');
    this.orderForm = this.fb.group({});
    // this.authService.currentUserId.pipe(take(1)).subscribe((id) => {
    //   this.userId = id;
    // });
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
          this.dialogBoxMessage = err.message;
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
    this.router.navigate(['/user', 'login']);
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
          this.dialogBoxMessage = err.message;
          this.showDialogBox = true;
        }
      });
    } else {
      this.cart.splice(index, 1);
    }

  }
}

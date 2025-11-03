import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../../core/models/book.model';
import { CartService } from '../../../../core/services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-info-page',
  templateUrl: './product-info-page.component.html',
  styleUrl: './product-info-page.component.scss',
  standalone: false
})
export class ProductInfoPageComponent implements OnInit {
  product!: Book;
  showDialogBox = false;
  dialogBoxMessage: string = '';
  cartForm!: FormGroup;
  constructor(private route: ActivatedRoute, private cartService: CartService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.product = data['info'];
    });
    this.cartForm = this.fb.group({
      quantity: this.fb.control(1, [Validators.required, Validators.min(1)])
    });
  }

  onClickAddToCart() {
    const quantity = Math.floor(this.cartForm.get('quantity')?.value);
    const cartItem = {
      product: this.product,
      quantity
    };
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.cartService.addToUserCart(userId, cartItem).subscribe({
        next: () => {
          this.showAddToCartResult(true);
        },
        error: (err: Error) => {
          this.showAddToCartResult(false, err.message);
        }
      });
    } else {
      try {
        this.cartService.addToCart(cartItem);
        this.showAddToCartResult(true);
      } catch (error) {
        console.error(error);
        this.showAddToCartResult(false, 'Failed to add book to cart.');
      }
    }
  }
  onCloseDialogBox() {
    this.showDialogBox = false;
  }
  showAddToCartResult(isSuccess: boolean, errorMessage: string = '') {
    this.dialogBoxMessage = isSuccess? 'Product successfully added to cart.' : errorMessage;
    this.showDialogBox = true;
  }
  getQuantityErrorMessaage() {
    const errors = this.cartForm.get('quantity')?.errors;
    if (errors && errors['required']) {
      return 'Quantity required!';
    }
    if (errors && errors['min']) {
      return 'Quantity must be at least 1!';
    }
    return 'Invalid quantity';
  }
}

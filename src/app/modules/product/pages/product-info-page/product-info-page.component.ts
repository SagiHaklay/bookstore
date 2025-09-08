import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../../core/models/book.model';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-product-info-page',
  templateUrl: './product-info-page.component.html',
  styleUrl: './product-info-page.component.scss'
})
export class ProductInfoPageComponent implements OnInit {
  product!: Book;
  showDialogBox = false;
  dialogBoxMessage: string = '';
  constructor(private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.product = data['info'];
    });
  }

  onClickAddToCart() {
    const cartItem = {
      product: this.product,
      quantity: 1
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
}

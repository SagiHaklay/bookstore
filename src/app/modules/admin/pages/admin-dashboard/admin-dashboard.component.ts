import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book.model';
import { ActivatedRoute } from '@angular/router';
import { BookData } from '../../../../core/models/book-data.model';
import { ProductService } from '../../../../core/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  products!: Book[];
  displayAddProductForm = false;
  displayDialogBox = false;
  dialogBoxMessage: string = 'Book added successfully';
  queryParamsSub!: Subscription;
  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.products = data['products'];
    });
    this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      if (params['bookDeleted']) {
        this.dialogBoxMessage = 'Book deleted successfully';
        this.displayDialogBox = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSub.unsubscribe();
  }

  onClickAddProduct() {
    this.displayAddProductForm = true;
  }
  onCloseAddProduct() {
    this.displayAddProductForm = false;
  }
  onCloseMessage() {
    this.displayDialogBox = false;
  }
  onSubmitAddProduct(productData: BookData) {
    this.productService.addProduct(productData).subscribe({
      next: (product) => {
        this.products.push(product);
        this.displayAddProductForm = false;
        this.dialogBoxMessage = 'Book added successfully';
        this.displayDialogBox = true;
      },
      error: (err: Error) => {
        this.displayAddProductForm = false;
        this.dialogBoxMessage = 'Failed to add book.';
        this.displayDialogBox = true;
      }
    });
  }

}

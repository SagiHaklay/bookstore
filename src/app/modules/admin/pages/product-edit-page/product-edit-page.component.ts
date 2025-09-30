import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookData } from '../../../../core/models/book-data.model';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-edit-page',
  templateUrl: './product-edit-page.component.html',
  styleUrl: './product-edit-page.component.scss'
})
export class ProductEditPageComponent implements OnInit {
  product!: Book;
  displayEditForm = false;
  displayDialogBox = false;
  isConfirmDelete = false;
  dialogBoxMessage: string = '';
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.product = data['product'];
    });
  }

  onClickEdit() {
    this.displayEditForm = true;
  }
  onCloseEditForm() {
    this.displayEditForm = false;
  }
  onEditFormSubmit(productData: BookData) {
    this.productService.updateProduct(this.product.id, productData).subscribe({
      next: (updated) => {
        this.product = updated;
        this.displayEditForm = false;
        this.dialogBoxMessage = 'Product edited successfully';
        this.isConfirmDelete = false;
        this.displayDialogBox = true;
      },
      error: (err: Error) => {
        this.dialogBoxMessage = err.message;
        this.displayEditForm = false;
        this.isConfirmDelete = false;
        this.displayDialogBox = true;
      }
    });
  }
  onClickDelete() {
    this.dialogBoxMessage = `Are you sure you want to delete book #${this.product.id}?`;
    this.isConfirmDelete = true;
    this.displayDialogBox = true;
  }
  onConfirmDelete() {
    this.productService.deleteProduct(this.product.id).subscribe({
      next: () => {
        this.displayDialogBox = false;
        this.router.navigate(['/admin', 'dashboard'], {
          queryParams: {bookDeleted: true}
        });
      },
      error: (err: Error) => {
        this.dialogBoxMessage = err.message;
        this.displayEditForm = false;
        this.isConfirmDelete = false;
        this.displayDialogBox = true;
      }
    });
  }
  onCloseDialogBox() {
    this.displayDialogBox = false;
  }
}

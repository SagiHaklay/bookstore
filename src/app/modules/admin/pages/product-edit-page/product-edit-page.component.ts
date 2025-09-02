import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book.model';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private productService: ProductService) {}

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
    this.productService.updateProduct(this.product.id, productData).subscribe((updated) => {
      this.product = updated;
      this.displayEditForm = false;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book.model';
import { ActivatedRoute } from '@angular/router';
import { BookData } from '../../../../core/models/book-data.model';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  products!: Book[];
  displayAddProductForm = false;
  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.products = data['products'];
    });
  }

  onClickAddProduct() {
    this.displayAddProductForm = true;
  }
  onCloseAddProduct() {
    this.displayAddProductForm = false;
  }
  onSubmitAddProduct(productData: BookData) {
    this.productService.addProduct(productData).subscribe(() => {
      this.displayAddProductForm = false;
    });
  }

}

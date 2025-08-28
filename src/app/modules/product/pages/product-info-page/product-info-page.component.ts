import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../../core/models/book.model';

@Component({
  selector: 'app-product-info-page',
  templateUrl: './product-info-page.component.html',
  styleUrl: './product-info-page.component.scss'
})
export class ProductInfoPageComponent implements OnInit {
  product!: Book;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.product = data['info'];
    });
  }

}

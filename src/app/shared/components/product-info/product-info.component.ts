import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
  standalone: false
})
export class ProductInfoComponent implements OnInit {
  @Input() product!: Book;
  imageUrl!: string;

  ngOnInit(): void {
    this.imageUrl = this.product.imageUrl? `${environment.apiUrl}/images/${this.product.imageUrl}` : '';
  }
}

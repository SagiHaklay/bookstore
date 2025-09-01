import { Component, Input } from '@angular/core';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent {
  @Input() product!: Book;
}

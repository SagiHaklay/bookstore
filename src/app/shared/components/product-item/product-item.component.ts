import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  standalone: false
})
export class ProductItemComponent implements OnInit {
  @Input() item!: Book;
  imageUrl!: string;

  ngOnInit(): void {
    this.imageUrl = this.item.imageUrl? `${environment.apiUrl}/images/${this.item.imageUrl}` : 'noimage.jpeg';
  }
}

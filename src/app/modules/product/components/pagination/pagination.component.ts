import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input() products: Book[] = [];
  pageCapacity: number = 20;
  currentPageNum = 1;
  currentPageContent: Book[] = [];
  constructor() {}

  ngOnInit(): void {
    this.currentPageContent = this.products.slice(0, this.pageCapacity);
  }

  updatePage(pageNum: number) {
    this.currentPageNum = pageNum;
    const startIndex = (this.currentPageNum - 1) * this.pageCapacity;
    this.currentPageContent = this.products.slice(startIndex, startIndex + this.pageCapacity);
  }
}

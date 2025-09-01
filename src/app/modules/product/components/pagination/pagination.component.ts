import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input() products: Book[] = [];
  pageCapacity: number = 1;
  currentPageNum = 1;
  currentPageContent: Book[] = [];
  pageCount: number = 1;
  pageWindowOffset = 2;
  pageWindow: number[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageCount = Math.ceil(this.products.length / this.pageCapacity);
    this.route.params.subscribe((params) => {
      this.currentPageNum = params['pageNum'];
      this.updatePage(this.currentPageNum);
    });
    
  }

  updatePage(pageNum: number) {
    this.currentPageNum = pageNum;
    const startIndex = (this.currentPageNum - 1) * this.pageCapacity;
    this.currentPageContent = this.products.slice(startIndex, startIndex + this.pageCapacity);
    const windowStart = Math.max(1, this.currentPageNum - this.pageWindowOffset);
    const windowEnd = Math.min(this.pageCount, this.currentPageNum + this.pageWindowOffset);
    this.pageWindow = [];
    for (let i = windowStart; i <= windowEnd; i++) {
      this.pageWindow.push(i);
    }
  }
}

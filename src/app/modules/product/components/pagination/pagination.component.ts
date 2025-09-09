import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Book } from '../../../../core/models/book.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit, OnDestroy, OnChanges {
  @Input() products: Book[] = [];
  pageCapacity: number = 5;
  currentPageNum = 1;
  currentPageContent: Book[] = [];
  pageCount: number = 1;
  pageWindowOffset = 2;
  pageWindow: number[] = [];
  queryParamsSub!: Subscription;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageCount = Math.ceil(this.products.length / this.pageCapacity);
    this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      this.currentPageNum = parseInt(params['page']) || 1;
      this.updatePage(this.currentPageNum);
    });
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.pageCount = Math.ceil(this.products.length / this.pageCapacity);
    // this.currentPageNum = 1;
    this.updatePage(this.currentPageNum);
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

  ngOnDestroy(): void {
    this.queryParamsSub.unsubscribe();
  }
}

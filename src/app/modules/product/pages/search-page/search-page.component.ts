import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../../../core/models/book.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit, OnDestroy {
  products: Book[] = [];
  searchQuery: string = '';
  queryParamsSub!: Subscription;
  searchResults: Book[] = [];
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.products = data['products'];
      this.searchResults = this.getSearchResults();
    });
    this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['query'] || '';
      this.searchResults = this.getSearchResults();
      // console.log(this.searchResults);
    });
  }

  getSearchResults() {
    if (this.searchQuery.length === 0) {
      return this.products;
    }
    return this.products.filter((product) => {
      return product.name.toLowerCase().includes(this.searchQuery);
    });
  }

  onSearch(query: string) {
    // console.log(query);
    this.router.navigate(['./'], {
      queryParams: {query},
      relativeTo: this.route
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSub.unsubscribe();
  }
}

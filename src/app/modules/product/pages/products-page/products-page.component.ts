import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../../../core/models/book.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  standalone: false
})
export class ProductsPageComponent implements OnInit {
  products: Book[] = [];
  searchResults: Book[] = [];
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.products = data['products'];
      this.searchResults = this.products;
    });
  }

  onSearch(query: string) {
    this.router.navigate(['search'], {
      queryParams: {query},
      relativeTo: this.route
    });
  }
  onQueryChange(query: string) {
    if (query.length === 0) {
      this.searchResults = this.products;
    } else {
      this.searchResults = this.products.filter((product) => {
        return product.name.toLowerCase().includes(query) || product.author.toLowerCase().includes(query);
      });
    }
  }
}

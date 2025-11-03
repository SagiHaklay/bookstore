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
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.products = data['products'];
    });
  }

  onSearch(query: string) {
    this.router.navigate(['search'], {
      queryParams: {query},
      relativeTo: this.route
    });
  }
}

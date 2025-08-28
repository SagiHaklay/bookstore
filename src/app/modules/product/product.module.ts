import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductInfoPageComponent } from './pages/product-info-page/product-info-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SharedModule } from '../../shared/shared.module';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductInfoPageComponent,
    SearchPageComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
]
})
export class ProductModule { }

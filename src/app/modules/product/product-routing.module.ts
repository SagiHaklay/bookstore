import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProductInfoPageComponent } from './pages/product-info-page/product-info-page.component';

const routes: Routes = [
  { path: '', component: ProductsPageComponent, pathMatch: 'full' },
  { path: 'search', component: SearchPageComponent },
  { path: ':id', component: ProductInfoPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class ProductRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProductInfoPageComponent } from './pages/product-info-page/product-info-page.component';
import { productsResolver } from '../../core/resolvers/products.resolver';
import { productInfoResolver } from '../../shared/resolvers/product-info.resolver';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'page/1', 
    pathMatch: 'full', 
  },
  {
    path: 'page/:pageNum',
    component: ProductsPageComponent, 
    resolve: {
      products: productsResolver
    }
  },
  { path: 'search', component: SearchPageComponent },
  { 
    path: ':id', 
    component: ProductInfoPageComponent,
    resolve: {
      info: productInfoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

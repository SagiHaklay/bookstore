import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { cartResolver } from './resolvers/cart.resolver';

const routes: Routes = [
  { 
    path: 'cart', 
    component: CartPageComponent,
    resolve: {
      cart: cartResolver
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class OrderRoutingModule { }

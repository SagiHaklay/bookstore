import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { cartResolver } from './resolvers/cart.resolver';
import { OrderSummaryPageComponent } from './pages/order-summary-page/order-summary-page.component';

const routes: Routes = [
  { 
    path: 'cart', 
    component: CartPageComponent,
    resolve: {
      cart: cartResolver
    } 
  },
  { path: 'summary', component: OrderSummaryPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

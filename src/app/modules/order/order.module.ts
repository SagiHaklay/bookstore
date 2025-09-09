import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { SharedModule } from '../../shared/shared.module';
import { OrderSummaryPageComponent } from './pages/order-summary-page/order-summary-page.component';


@NgModule({
  declarations: [
    CartPageComponent,
    OrderSummaryPageComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }

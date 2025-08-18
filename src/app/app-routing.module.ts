import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  { 
    path: 'product', 
    loadChildren: () => import('./modules/product/product-routing.module').then(m => m.ProductRoutingModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user-routing.module').then(m => m.UserRoutingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin-routing.module').then(m => m.AdminRoutingModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./modules/order/order-routing.module').then(m => m.OrderRoutingModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

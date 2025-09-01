import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from '../../core/guards/auth.guard';
import { adminLoggedOutGuard } from './guards/admin-logged-out.guard';
import { productsResolver } from '../../core/resolvers/products.resolver';
import { ProductEditPageComponent } from './pages/product-edit-page/product-edit-page.component';
import { productInfoResolver } from '../../shared/resolvers/product-info.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard, AdminGuard],
    resolve: {
      products: productsResolver
    }
  },
  {
    path: 'product/:id',
    component: ProductEditPageComponent,
    canActivate: [AuthGuard, AdminGuard],
    resolve: {
      product: productInfoResolver
    }
  },
  { path: 'login', component: AdminLoginPageComponent, canActivate: [adminLoggedOutGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

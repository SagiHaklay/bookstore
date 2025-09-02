import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminGuard } from './guards/admin.guard';
import { SharedModule } from '../../shared/shared.module';
import { ProductEditPageComponent } from './pages/product-edit-page/product-edit-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminLoginPageComponent,
    ProductEditPageComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [AdminGuard]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminGuard } from './guards/admin.guard';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminLoginPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [AdminGuard]
})
export class AdminModule { }

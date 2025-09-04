import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';
import { UserSignupPageComponent } from './pages/user-signup-page/user-signup-page.component';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from './services/user.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';



@NgModule({
  declarations: [
    UserLoginPageComponent,
    UserAccountPageComponent,
    UserSignupPageComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [UserService]
})
export class UserModule { }

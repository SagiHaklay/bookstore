import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';
import { UserSignupPageComponent } from './pages/user-signup-page/user-signup-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: 'login', component: UserLoginPageComponent },
  { path: 'account', component: UserAccountPageComponent },
  { path: 'signup', component: UserSignupPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class UserRoutingModule { }

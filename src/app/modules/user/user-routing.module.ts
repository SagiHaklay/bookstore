import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { UserAccountPageComponent } from './pages/user-account-page/user-account-page.component';
import { UserSignupPageComponent } from './pages/user-signup-page/user-signup-page.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { loggedOutGuard } from './guards/logged-out.guard';
import { userAccountResolver } from './resolvers/user-account.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { 
    path: 'login', 
    component: UserLoginPageComponent, 
    canActivate: [loggedOutGuard] 
  },
  { 
    path: 'account', 
    component: UserAccountPageComponent, 
    canActivate: [AuthGuard], 
    resolve: {
      account: userAccountResolver
    }
  },
  { 
    path: 'signup', 
    component: UserSignupPageComponent, 
    canActivate: [loggedOutGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class UserRoutingModule { }

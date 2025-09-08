import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isAdmin = false;
  tokenSub!: Subscription;
  isAdminSub!: Subscription;
  showMobileNavbar = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.tokenSub = this.authService.token.subscribe((token) => {
      this.isLoggedIn = token !== null;
    });
    this.isAdminSub = this.authService.isAdmin.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    // this.authService.mockSignup(false);
    // this.authService.login('user', 'password');
    // this.authService.login('admin', 'admin');
  }
  onClickLogOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  onToggleMobileNavbar() {
    this.showMobileNavbar = !this.showMobileNavbar;
  }
  ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
    this.isAdminSub.unsubscribe();
  }
  onClickMobileNavLink() {
    this.showMobileNavbar = false;
  }
  onClickLogOutMobile() {
    this.onClickLogOut();
    this.onClickMobileNavLink();
  }
}

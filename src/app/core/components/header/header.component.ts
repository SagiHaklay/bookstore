import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.tokenSub = this.authService.token.subscribe((token) => {
      this.isLoggedIn = token !== null;
    });
    this.isAdminSub = this.authService.isAdmin.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    // this.authService.mockSignup(false);
    // this.authService.login('', '');
  }

  ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
    this.isAdminSub.unsubscribe();
  }
}

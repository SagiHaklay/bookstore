import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrl: './user-login-page.component.scss',
  standalone: false
})
export class UserLoginPageComponent implements OnInit {
  showDialogBox = false;
  dialogBoxMessage = 'Authentication expired. Please log in again.';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['expired']) {
        this.showDialogBox = true;
      }
    });
  }

  onCloseDialogBox() {
    this.showDialogBox = false;
  }

}

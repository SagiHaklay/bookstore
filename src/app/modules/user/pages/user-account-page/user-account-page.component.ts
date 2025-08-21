import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAccount } from '../../models/user-account.model';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrl: './user-account-page.component.scss'
})
export class UserAccountPageComponent implements OnInit {
  userAccount: UserAccount | null = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.userAccount = data['account'];
    });
  }

}

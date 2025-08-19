import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrl: './user-account-page.component.scss'
})
export class UserAccountPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

  }

}

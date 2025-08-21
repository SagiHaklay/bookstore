import { Component } from '@angular/core';
import { UserData } from '../../models/user-data.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup-page',
  templateUrl: './user-signup-page.component.html',
  styleUrl: './user-signup-page.component.scss'
})
export class UserSignupPageComponent {
  errorMessage: string = '';
  constructor(private userService: UserService, private router: Router) {}

  onUserSignUp(userData: UserData) {
    const {username, password, email} = userData;
    if (username && password && email) {
      this.userService.addUser(username, password, email).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['user', 'login']);
        },
        error: (err: Error) => {
          this.errorMessage = err.message;
        }
      });
    }
    
  }
}

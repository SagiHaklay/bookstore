import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccount } from '../../models/user-account.model';
import { UserData } from '../../models/user-data.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrl: './user-account-page.component.scss'
})
export class UserAccountPageComponent implements OnInit {
  userAccount: UserAccount | null = null;
  editErrorMessage: string = '';
  showEditModal = false;
  constructor(
    private route: ActivatedRoute, 
    private userService: UserService, 
    private router: Router, 
    private authService: AuthService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.userAccount = data['account'];
    });
  }

  onClickEdit() {
    this.showEditModal = true;
    console.log('edit');
  }

  onModalClose() {
    this.showEditModal = false;
  }

  onEditSubmit(userData: UserData) {
    if (this.userAccount !== null) {
      this.userService.updateUser(this.userAccount.id, userData).subscribe({
        next: (res) => {
          this.userAccount = res;
          this.showEditModal = false;
        },
        error: (err: Error) => {
          this.editErrorMessage = err.message;
        }
      });
    }
  }
  onClickDeleteAccount() {
    if (this.userAccount !== null) {
      this.userService.deleteUser(this.userAccount.id).subscribe({
        next: () => {
          this.authService.logout();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

}

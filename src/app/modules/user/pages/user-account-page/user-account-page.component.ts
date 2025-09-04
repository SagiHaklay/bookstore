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
  userAccount!: UserAccount;
  editErrorMessage: string = '';
  showModal = false;
  isChangePassword = false;
  displayDialogBox = false;
  dialogBoxMessage = '';
  isConfirmDelete = false;
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
    this.isChangePassword = false;
    this.showModal = true;
    // console.log('edit');
  }
  onClickChangePassword() {
    this.isChangePassword = true;
    this.showModal = true;
  }
  onModalClose() {
    this.showModal = false;
  }

  onEditSubmit(userData: UserData) {
    if (this.userAccount !== null) {
      this.userService.updateUser(this.userAccount.id, userData).subscribe({
        next: (res) => {
          this.userAccount = res;
          this.showModal = false;
          this.dialogBoxMessage = 'Account details edited successfully';
          this.isConfirmDelete = false;
          this.displayDialogBox = true;
        },
        error: (err: Error) => {
          this.editErrorMessage = err.message;
        }
      });
    }
  }
  onClickDeleteAccount() {
    this.dialogBoxMessage = 'Are you sure you want to delete your account?';
    this.isConfirmDelete = true;
    this.displayDialogBox = true;
  }
  onDialogBoxClose() {
    this.displayDialogBox = false;
  }
  onConfirmDelete() {
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

  onChangePasswordSubmit(password: string) {
    this.userService.updateUser(this.userAccount.id, {password}).subscribe({
      next: (res) => {
        this.userAccount = res;
        this.showModal = false;
        this.dialogBoxMessage = 'Password changed successfully';
        this.isConfirmDelete = false;
        this.displayDialogBox = true;
      },
      error: (err: Error) => {
        this.editErrorMessage = err.message;
      }
    });
  }

}

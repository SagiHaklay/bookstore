import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  @Input() checkAdmin = false;
  loginForm!: FormGroup;
  usernameInput!: AbstractControl | null;
  passwordInput!: AbstractControl | null;
  loginFailedMessage: string = '';
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
    this.usernameInput = this.loginForm.get('username');
    this.passwordInput = this.loginForm.get('password');
  }

  onFormSubmit() {
    const username = this.usernameInput?.value;
    const password = this.passwordInput?.value;
    this.authService.login(username, password, this.checkAdmin).subscribe({
      next: (res) => {
        if (this.checkAdmin && !res.isAdmin) {
          this.loginFailedMessage = 'User is not an admin!';
        } else {
          this.router.navigate(['/']);
        }
        
      },
      error: () => {
        this.loginFailedMessage = 'Username and/or password are incorrect';
      }
    });
  }
}

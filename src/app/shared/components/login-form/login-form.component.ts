import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Input() checkAdmin = false;
  loginForm!: FormGroup;
  usernameInput!: AbstractControl | null;
  passwordInput!: AbstractControl | null;
  loginFailedMessage: string = '';
  queryParamsSub!: Subscription;
  saveCart: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
	this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      this.saveCart = params['saveCart'] || false;
    });
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
    this.usernameInput = this.loginForm.get('username');
    this.passwordInput = this.loginForm.get('password');
  }
  ngOnDestroy(): void {
    this.queryParamsSub.unsubscribe();
  }

  onFormSubmit() {
    const username = this.usernameInput?.value;
    const password = this.passwordInput?.value;
    this.authService.login(username, password, this.checkAdmin, this.saveCart).subscribe({
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserData } from '../../../modules/user/models/user-data.model';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  @Input() user: UserData = { username: '', email: '', password: '' };
  @Output() userSubmit = new EventEmitter<UserData>();
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const options: AbstractControlOptions = {
      validators: [this.passwordRepeatValidator]
    };
    this.userForm = this.fb.group({
      username: this.fb.control(this.user.username, [Validators.required]),
      email: this.fb.control(this.user.email, [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      repeatPassword: this.fb.control('', [Validators.required])
    }, options);
    
  }
  passwordRepeatValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeatedPassword = control.get('repeatPassword')?.value;
    if (password !== repeatedPassword) {
      return {
        passwordRepeatError: true
      };
    }
    return null;
  }
  getEmailErrorMessage() {
    const email = this.userForm.get('email');
    if (email?.errors && email.errors['required']) {
      return 'E-mail required';
    }
    if (email?.errors && email.errors['email']) {
      return 'Invalid E-mail address!';
    }
    return 'E-mail error';
  }
  onFormSubmit() {
    this.user.username = this.userForm.get('username')?.value;
    this.user.email = this.userForm.get('email')?.value;
    this.user.password = this.userForm.get('password')?.value;
    this.userSubmit.emit(this.user);
  }

}

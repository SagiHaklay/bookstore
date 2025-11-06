import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserData } from '../../../modules/user/models/user-data.model';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  standalone: false
})
export class UserFormComponent implements OnInit {
  @Input() user: UserData = { username: '', email: '', password: '' };
  @Input() includePassword: boolean = false;
  @Input() includeCancel: boolean = false;
  @Output() userSubmit = new EventEmitter<UserData>();
  @Output() cancelForm = new EventEmitter();
  userForm!: FormGroup;
  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const options: AbstractControlOptions = {
      validators: [this.passwordRepeatValidator]
    };
    const controls : any = {
      username: this.fb.control(this.user.username, [Validators.required]),
      email: this.fb.control(this.user.email, [Validators.required, Validators.email]),
    };
    if (this.includePassword) {
      controls.password = this.fb.control('', [Validators.required, this.passwordValidator]);
      controls.repeatPassword = this.fb.control('', [Validators.required]);
    }
    this.userForm = this.includePassword? this.fb.group(controls, options) : this.fb.group(controls);
    
  }
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value;
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/;
    if (!re.test(password)) {
      return {
        formatError: true
      }
    }
    return null;
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
  getPasswordError() {
    const password = this.userForm.get('password');
    if (password?.errors && password.errors['required']) {
      return 'Password required';
    }
    if (password?.errors && password.errors['formatError']) {
      return "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }
    return 'Password error';
  }
  onFormSubmit() {
    this.user.username = this.userForm.get('username')?.value;
    this.user.email = this.userForm.get('email')?.value;
    this.user.password = this.includePassword? this.userForm.get('password')?.value : this.user.password;
    this.userSubmit.emit(this.user);
  }
  onCancelClick() {
    this.cancelForm.emit();
  }
}

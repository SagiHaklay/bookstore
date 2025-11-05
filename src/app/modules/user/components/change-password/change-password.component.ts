import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ChangePasswordModel } from '../../models/change-password.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  standalone: false
})
export class ChangePasswordComponent implements OnInit {
  @Input() oldPassword: string | undefined = undefined;
  @Output() passwordSubmit = new EventEmitter<ChangePasswordModel>();
  @Output() cancelForm = new EventEmitter();
  passwordForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const options: AbstractControlOptions = {
      validators: [this.passwordRepeatValidator]
    };
    this.passwordForm = this.fb.group({
      password: this.fb.control('', [Validators.required, this.passwordValidator]),
      repeatPassword: this.fb.control('', [Validators.required]),
      oldPassword: this.fb.control('', [Validators.required])
    }, options);
  }
  onCancelClick() {
    this.cancelForm.emit();
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
  oldPasswordValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value !== this.oldPassword) {
        return {
          oldPasswordError: true
        };
      }
      return null;
    };
    
  }

  getOldPasswordErrorMessage() {
    const errors = this.passwordForm.get('oldPassword')?.errors;
    if (errors && errors['required']) {
      return 'Old password required!';
    }
    if (errors && errors['oldPasswordError']) {
      return 'Old password is incorrect!';
    }
    return 'Invalid old password';
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
  getPasswordError() {
    const password = this.passwordForm.get('password')?.value;
    if (password?.errors && password.errors['required']) {
      return 'Password required';
    }
    if (password?.errors && password.errors['formatError']) {
      return "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }
    return 'Password error';
  }
  onFormSubmit() {
    const newPassword = this.passwordForm.get('password')?.value;
    const oldPassword = this.passwordForm.get('oldPassword')?.value;
    this.passwordSubmit.emit({
      oldPassword, newPassword
    });
  }
}

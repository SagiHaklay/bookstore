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
  passwordForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const options: AbstractControlOptions = {
      validators: [this.passwordRepeatValidator]
    };
    this.passwordForm = this.fb.group({
      password: this.fb.control('', [Validators.required]),
      repeatPassword: this.fb.control('', [Validators.required]),
      oldPassword: this.fb.control('', [Validators.required])
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

  onFormSubmit() {
    const newPassword = this.passwordForm.get('password')?.value;
    const oldPassword = this.passwordForm.get('oldPassword')?.value;
    this.passwordSubmit.emit({
      oldPassword, newPassword
    });
  }
}

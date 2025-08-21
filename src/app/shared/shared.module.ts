import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    UserFormComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [LoginFormComponent, UserFormComponent, ModalComponent]
})
export class SharedModule { }

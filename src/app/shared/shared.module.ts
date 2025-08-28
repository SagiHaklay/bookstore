import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProductItemComponent } from './components/product-item/product-item.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    UserFormComponent,
    ModalComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginFormComponent, 
    UserFormComponent, 
    ModalComponent,
    ProductItemComponent
  ]
})
export class SharedModule { }

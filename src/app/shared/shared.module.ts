import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    UserFormComponent,
    ModalComponent,
    ProductItemComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginFormComponent, 
    UserFormComponent, 
    ModalComponent,
    ProductItemComponent,
    ProductInfoComponent
  ]
})
export class SharedModule { }

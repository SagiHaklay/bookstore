import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthService],
  exports: []
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule)
      throw new Error('Core module is already loaded.');
  }
}

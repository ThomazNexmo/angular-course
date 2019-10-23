import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [SignupComponent, LoginComponent], // components that we use in this modules
  imports: [
    ReactiveFormsModule,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
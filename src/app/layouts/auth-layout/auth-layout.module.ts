import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';

import { LoginComponent } from '../../pages/Auth/login/login.component';
import { RegisterComponent } from '../../pages/Auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ForgetPasswordComponent } from 'src/app/pages/Auth/forget-password/forget-password.component';
import { NewPassComponent } from 'src/app/pages/Auth/new-pass/new-pass.component';
import { UsersComponent } from 'src/app/pages/users/users.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    NewPassComponent,

  ]
})
export class AuthLayoutModule { }

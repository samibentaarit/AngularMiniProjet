import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
// import {ChambreComponent} from '../../pages/chambre/chambre.component';

import { LoginComponent } from '../../pages/Auth/login/login.component';
import { RegisterComponent } from '../../pages/Auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    // NgbModule
  ],
  declarations: [
    // ChambreComponent
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthLayoutModule { }

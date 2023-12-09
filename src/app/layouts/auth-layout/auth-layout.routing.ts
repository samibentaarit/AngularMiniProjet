import { Routes } from '@angular/router';

import { ForgetPasswordComponent } from 'src/app/pages/Auth/forget-password/forget-password.component';
import { NewPassComponent } from 'src/app/pages/Auth/new-pass/new-pass.component';
import { UsersComponent } from 'src/app/pages/Auth/users/users.component';
import {ChambreComponent} from '../../pages/chambre/chambre.component';
import { LoginComponent } from '../../pages/Auth/login/login.component';
import { RegisterComponent } from '../../pages/Auth/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'forgetpassword',    component:ForgetPasswordComponent},
    { path: 'newpassword',    component:NewPassComponent},

];

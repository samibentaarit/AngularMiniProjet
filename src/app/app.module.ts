import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { UniversiteComponent, UniversiteDialog } from './pages/universite/universite.component';
<<<<<<< HEAD
import {BlocComponent, BlocDialog, BlocEditDialog} from './pages/bloc/bloc.component';
import {MatDialogModule} from "@angular/material/dialog";
=======
import { Register1Component } from './pages/Auth/oldregister/register1.component';
import { Login1Component } from './pages/Auth/oldlogin/login1.component';
>>>>>>> 7b20aba4c27f7ed3d6ddd84a95d55c000ee5b6a0


@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    MatDialogModule,
    FormsModule
=======
    FormsModule,
    HttpClientModule
>>>>>>> 7b20aba4c27f7ed3d6ddd84a95d55c000ee5b6a0
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
<<<<<<< HEAD
    BlocComponent,
    BlocDialog,
    BlocEditDialog,

=======
    Register1Component,
    Login1Component,
>>>>>>> 7b20aba4c27f7ed3d6ddd84a95d55c000ee5b6a0
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

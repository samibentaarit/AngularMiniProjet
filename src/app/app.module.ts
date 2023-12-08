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
import {BlocComponent, BlocDialog, BlocEditDialog} from './pages/bloc/bloc.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FoyerComponent, FoyerDialog, FoyerEditDialog} from './pages/foyer/foyer.component';
import { Register1Component } from './pages/Auth/oldregister/register1.component';
import { Login1Component } from './pages/Auth/oldlogin/login1.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {SuggestionDialog, SuggestionEditDialog, SuggestionsComponent} from './pages/suggestions/suggestions.component';
import { DetailsfoyerComponent } from './pages/detailsfoyer/detailsfoyer.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    FormsModule,
    HttpClientModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    BlocComponent,
    BlocDialog,
    BlocEditDialog,
    FoyerComponent,
      FoyerDialog,
      FoyerEditDialog,
      Register1Component,
    Login1Component,
    SuggestionsComponent,
      SuggestionDialog,
      SuggestionEditDialog,
    DetailsfoyerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

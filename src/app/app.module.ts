import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {ChambreComponent } from './pages/chambre/chambre.component';
import { EquipementComponent } from './pages/equipement/equipement.component';
import { BlocComponent } from './pages/bloc/bloc.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import {ChambreDialog} from './pages/chambre-dialog/chambre-dialog.component';
import {ChambreEditDialog} from './pages/chambre-edit-dialog/chambre-edit-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {ChambreService} from './services/chambre.service';
import {EquipementService} from './services/equipement.service';
import {BrowserModule} from '@angular/platform-browser';
import { EquipementDialogComponent } from './pages/equipement-dialog/equipement-dialog.component';
import { EquipementEditDialogComponent } from './pages/equipement-edit-dialog/equipement-edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {ChambreDetailsComponent} from './pages/chambre-details/chambre-details.component';
import { DiscountLabelDirective } from './discount-label.directive';
import { ChambreGroupComponent } from './pages/chambre-group/chambre-group.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    ClipboardModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ChambreComponent,
      ChambreDialog,
      ChambreEditDialog,
    EquipementComponent,
    BlocComponent,
    ReservationComponent,
    EquipementDialogComponent,
    EquipementEditDialogComponent,
    ChambreDetailsComponent,
    DiscountLabelDirective,
    ChambreGroupComponent,
    ],
  providers:
    [ChambreService, EquipementService],
  bootstrap: [AppComponent]
})
export class AppModule { }

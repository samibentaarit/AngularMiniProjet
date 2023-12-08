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
import { UniversiteComponent, UniversiteDialog } from './pages/universite/universite.component';
import {BlocComponent, BlocDialog, BlocEditDialog} from './pages/bloc/bloc.component';
import {MatDialogModule} from "@angular/material/dialog";
import { Register1Component } from './pages/Auth/oldregister/register1.component';
import { Login1Component } from './pages/Auth/oldlogin/login1.component';
import { EtudiantComponent } from './pages/etudiant/etudiant.component';
import { EtudiantEditDialog} from "./pages/etudiant-edit-dialog/etudiant-edit-dialog.component";
import {EtudiantDialog} from "./pages/etudiant-dialog/etudiant-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatLegacyDialogModule} from "@angular/material/legacy-dialog";
import {MatLegacyOptionModule} from "@angular/material/legacy-core";
import {MatLegacySelectModule} from "@angular/material/legacy-select";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { DetailUniversiteComponent } from './pages/detail-universite/detail-universite.component';
import {MatButtonModule} from "@angular/material/button";
import {QRCodeModule} from "angular2-qrcode";

import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import { BlocDetailsComponent } from './pages/bloc/bloc-details/bloc-details.component';
import {ChambreService} from "./services/chambre.service";
import {
    BibliothequeComponent,
    BibliothequeDialog,
    BibliothequeEditDialog} from './pages/bibliotheque/bibliotheque.component';
import {QRCodeModule} from "angular2-qrcode";

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
        MatLegacyDialogModule,
        MatLegacyOptionModule,
        MatLegacySelectModule,
        MatOptionModule,
        MatSelectModule,
        MatButtonModule,
      QRCodeModule
    ],
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
    HttpClientModule,
    MatSelectModule,
    MatListModule,
    QRCodeModule,

  ],
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
    BlocDialog,
    BlocEditDialog,

    BlocDetailsComponent,
    Register1Component,
    Login1Component,

    EtudiantEditDialog,
      EtudiantDialog,



  ],
    BibliothequeComponent,
      BibliothequeDialog,
      BibliothequeEditDialog,
      ],
  providers: [],
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

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

import { EtudiantEditDialog} from "./pages/etudiant-edit-dialog/etudiant-edit-dialog.component";
import {EtudiantDialog} from "./pages/etudiant-dialog/etudiant-dialog.component";
import {MatLegacyDialogModule} from "@angular/material/legacy-dialog";
import {MatLegacyOptionModule} from "@angular/material/legacy-core";
import {MatLegacySelectModule} from "@angular/material/legacy-select";


import {
    BibliothequeComponent,
    BibliothequeDialog,
    BibliothequeEditDialog} from './pages/bibliotheque/bibliotheque.component';
import {QRCodeModule} from "angular2-qrcode";

import {ChambreComponent } from './pages/chambre/chambre.component';
import { EquipementComponent } from './pages/equipement/equipement.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import {ChambreDialog} from './pages/chambre-dialog/chambre-dialog.component';
import {ChambreEditDialog} from './pages/chambre-edit-dialog/chambre-edit-dialog.component';
import {ChambreService} from './services/chambre.service';
import {EquipementService} from './services/equipement.service';
import {BrowserModule} from '@angular/platform-browser';
import { EquipementDialogComponent } from './pages/equipement-dialog/equipement-dialog.component';
import { EquipementEditDialogComponent } from './pages/equipement-edit-dialog/equipement-edit-dialog.component';
import {ChambreDetailsComponent} from './pages/chambre-details/chambre-details.component';
import { DiscountLabelDirective } from './discount-label.directive';
import { ChambreGroupComponent } from './pages/chambre-group/chambre-group.component';
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
import {BlocComponent, BlocDialog, BlocEditDialog} from "./pages/bloc/bloc.component";
import {BlocDetailsComponent} from "./pages/bloc/bloc-details/bloc-details.component";
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import {ClubComponent, ClubDialog, ClubEditDialog} from "./pages/club/club.component";
import {UniversiteComponent, UniversiteDialog, UniversiteEditDialog} from "./pages/universite/universite.component";
import {Universite} from "./models/universite";
import {CommentaireComponent, DetailUniversiteComponent} from "./pages/detail-universite/detail-universite.component";


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
      QRCodeModule,
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
    ChambreComponent,
      ChambreDialog,
      ChambreEditDialog,
    EquipementComponent,
    BlocComponent,
    BlocDialog,
    BlocEditDialog,
ClubComponent,
    ClubDialog,
    ClubEditDialog,
    BlocDetailsComponent,
    Register1Component,
    Login1Component,

    EtudiantEditDialog,
      EtudiantDialog,



    AuthLayoutComponent,
    BlocComponent,

    FoyerComponent,
      FoyerDialog,
      FoyerEditDialog,
      Register1Component,
    Login1Component,
    SuggestionsComponent,
      SuggestionDialog,
      SuggestionEditDialog,
    DetailsfoyerComponent,
    BibliothequeComponent,
      BibliothequeDialog,
      BibliothequeEditDialog,

    EquipementDialogComponent,
    EquipementEditDialogComponent,
    ChambreDetailsComponent,
    DiscountLabelDirective,
    ChambreGroupComponent,
    UniversiteComponent,
      UniversiteEditDialog,
      UniversiteDialog,
    CommentaireComponent,
    ClubEditDialog,
      DetailUniversiteComponent,

    ],
  providers:
    [ChambreService, EquipementService],
  bootstrap: [AppComponent]
})
export class AppModule { }

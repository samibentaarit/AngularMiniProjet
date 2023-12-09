import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
;
// import {ChambreComponent} from '../../pages/chambre/chambre.component';
// import {EquipementComponent} from '../../pages/equipement/equipement.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UniversiteComponent, UniversiteDialog, UniversiteEditDialog } from 'src/app/pages/universite/universite.component';
import { ConfirmDialogComponent } from 'src/app/variables/popup/popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {RestaurantComponent, RestaurantDialog, RestaurantEditDialog} from "../../pages/restaurant/restaurant.component";
import {
  ReservationComponent,
  ReservationDialog,
  ReservationEditDialog
} from "../../pages/reservation/reservation.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    // UniversiteDialog,
    // UniversiteComponent,
    // UniversiteDialog,
    // UniversiteEditDialog,
    // ChambreComponent,
    // EquipementComponent,
    ConfirmDialogComponent,
    MapsComponent,
    ConfirmDialogComponent,
    RestaurantComponent,
    RestaurantDialog,
    RestaurantEditDialog,
    ReservationComponent,
    ReservationDialog,
    ReservationEditDialog,
  ]
})

export class AdminLayoutModule {}

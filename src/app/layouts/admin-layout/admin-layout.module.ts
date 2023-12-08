import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
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
// import { ToastrModule } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UniversiteComponent, UniversiteDialog, UniversiteEditDialog } from 'src/app/pages/universite/universite.component';

import { ConfirmDialogComponent } from 'src/app/variables/popup/popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {Club} from "../../models/club";
import {ClubComponent,ClubDialog,ClubEditDialog} from "../../pages/club/club.component";
import {
  CommentaireComponent,
  DetailUniversiteComponent
} from "../../pages/detail-universite/detail-universite.component";
import {QRCodeModule} from "angular2-qrcode";
import { UsersComponent } from 'src/app/pages/users/users.component';

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
    QRCodeModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    UniversiteDialog,
    UniversiteComponent,
    UniversiteDialog,
    UniversiteEditDialog,
    ConfirmDialogComponent,
    UsersComponent,


    ClubDialog,
    ClubEditDialog
  ,ClubComponent,DetailUniversiteComponent,CommentaireComponent
  ]
})

export class AdminLayoutModule {}

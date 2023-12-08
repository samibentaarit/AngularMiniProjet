import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UniversiteComponent } from 'src/app/pages/universite/universite.component';
import {EtudiantComponent} from "../../pages/etudiant/etudiant.component";
import {ClubComponent} from "../../pages/club/club.component";
import {DetailUniversiteComponent} from "../../pages/detail-universite/detail-universite.component";
import {BlocComponent} from "../../pages/bloc/bloc.component";
import { AuthentificationGuard } from 'src/app/pages/Auth/authentification.guard';
import { RoleGuardGuard } from 'src/app/pages/Auth/role-guard.guard';
import { ForgetPasswordComponent } from 'src/app/pages/Auth/forget-password/forget-password.component';
import { UsersComponent } from 'src/app/pages/users/users.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'uni',           component: UniversiteComponent },
  { path: 'etudiant',           component: EtudiantComponent },
  { path :'club', component: ClubComponent},
  { path: 'detail/:id', component: DetailUniversiteComponent },
  { path: 'users',    component:UsersComponent},
];


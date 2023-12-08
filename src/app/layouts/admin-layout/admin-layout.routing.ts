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
import {BlocDetailsComponent} from "../../pages/bloc/bloc-details/bloc-details.component";
import {BibliothequeComponent} from "../../pages/bibliotheque/bibliotheque.component";
import {ChambreComponent} from '../../pages/chambre/chambre.component';
import {EquipementComponent} from '../../pages/equipement/equipement.component';
import {ChambreDetailsComponent} from '../../pages/chambre-details/chambre-details.component';
import { UniversiteComponent } from 'src/app/pages/universite/universite.component';
import {BlocComponent, BlocDialog} from "../../pages/bloc/bloc.component";
import {FoyerComponent} from "../../pages/foyer/foyer.component";
import {DetailsfoyerComponent} from "../../pages/detailsfoyer/detailsfoyer.component";
import {SuggestionsComponent} from "../../pages/suggestions/suggestions.component";

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
    {path: 'bloc',          component:BlocComponent},
  { path: 'bibliotheque/:idBloc', component: BibliothequeComponent },
    { path: 'bloc-details/:idBloc', component: BlocDetailsComponent },
    {path: 'biblio',          component:BibliothequeComponent}

    { path: 'chambre',           component: ChambreComponent },
    { path: 'equipement',           component: EquipementComponent },
    {path: 'chambre-details/:id', component: ChambreDetailsComponent }
    { path: 'maps',           component: MapsComponent },
    { path: 'uni',           component: UniversiteComponent },
    {path: 'foyer',          component:FoyerComponent},
  { path: 'bloc/:idFoyer', component: BlocComponent },
  { path: 'foyer/consulterblocs/:idFoyer', component: DetailsfoyerComponent },
    {path: 'foyer/suggestion/:idFoyer',          component:SuggestionsComponent}

];


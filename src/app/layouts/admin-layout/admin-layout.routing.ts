import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {ChambreComponent} from '../../pages/chambre/chambre.component';
import {EquipementComponent} from '../../pages/equipement/equipement.component';
import {ChambreDetailsComponent} from '../../pages/chambre-details/chambre-details.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'chambre',           component: ChambreComponent },
    { path: 'equipement',           component: EquipementComponent },
    {path: 'chambre-details/:id', component: ChambreDetailsComponent }
];

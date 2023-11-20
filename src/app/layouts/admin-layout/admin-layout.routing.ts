import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UniversiteComponent } from 'src/app/pages/universite/universite.component';
import {BlocComponent} from "../../pages/bloc/bloc.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'uni',           component: UniversiteComponent },
<<<<<<< HEAD
    {path: 'bloc',          component:BlocComponent}
=======
    
>>>>>>> 7b20aba4c27f7ed3d6ddd84a95d55c000ee5b6a0
];

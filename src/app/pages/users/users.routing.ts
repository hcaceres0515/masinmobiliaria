
// noinspection TypeScriptValidateTypes
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import {AccessGuard} from "../access-guard";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AccessGuard],
    children: [
      { path: '', component: UsersListComponent, data: { userRole: ['admin'] } },
      { path: 'users_list', component: UsersListComponent, data: { userRole: ['admin'] } }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

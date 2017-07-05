
// noinspection TypeScriptValidateTypes
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: '', component: UsersListComponent },
      { path: 'users_list', component: UsersListComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

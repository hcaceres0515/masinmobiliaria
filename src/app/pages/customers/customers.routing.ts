// noinspection TypeScriptValidateTypes
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customers.component';
import { CustomersListComponent } from'./customers-list/customers-list.component';
import {AccessGuard} from "../access-guard";

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    canActivate: [AccessGuard],
    children: [
      { path: '', component: CustomersListComponent, data: { userRole: ['admin', 'agent'] }},
      { path: 'customers_list', component: CustomersListComponent, data: { userRole: ['admin', 'agent'] }}
    ]
  }
];

export const routing = RouterModule.forChild(routes);

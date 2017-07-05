// noinspection TypeScriptValidateTypes
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customers.component';
import { CustomersListComponent } from'./customers-list/customers-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: '', component: CustomersListComponent },
      { path: 'customers_list', component: CustomersListComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

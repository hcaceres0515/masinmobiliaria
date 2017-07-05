
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { CustomerComponent } from './customers.component';
import { Modals } from './components/modals/modals.component';
import { DropdownModule, ModalModule } from 'ng2-bootstrap';

import { routing } from './customers.routing';
import { ActionsTableComponent, CustomersListComponent } from './customers-list/customers-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTablesService } from '../tables/components/smartTables/smartTables.service';
import { CustomerService } from'./customer.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    Ng2SmartTableModule,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    routing
  ],
  entryComponents: [
    ActionsTableComponent
  ],
  declarations: [
    CustomerComponent,
    ActionsTableComponent,
    CustomersListComponent
  ],
  providers: [
    SmartTablesService,
    CustomerService
  ]
})
export class CustomerModule {}

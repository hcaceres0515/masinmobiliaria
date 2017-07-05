
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { Modals } from './components/modals/modals.component';
import { DropdownModule, ModalModule, TabsModule } from 'ng2-bootstrap';

import { routing } from './users.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { UsersComponent } from'./users.component';
import { ActionsUsersTableComponent, UsersListComponent } from './users-list/users-list.component';
import { UserService } from './user.service';
import { MyCommonModule } from '../../mycommon.module';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    Ng2SmartTableModule,
    NguiAutoCompleteModule,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    routing,
    MyCommonModule
  ],
  entryComponents: [
    ActionsUsersTableComponent
  ],
  declarations: [
    UsersComponent,
    UsersListComponent,
    ActionsUsersTableComponent,
    // UPLOAD_DIRECTIVES
  ],
  providers: [
    UserService
  ]

})
export class UsersModule {}

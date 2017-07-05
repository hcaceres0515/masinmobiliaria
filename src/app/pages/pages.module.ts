import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import { AuthService } from './auth-service';
import { AccessGuard } from './access-guard';
import { UserService } from './users/user.service';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Pages],
  providers: [
    AuthService,
    AccessGuard,
    UserService
  ]
})
export class PagesModule {
}

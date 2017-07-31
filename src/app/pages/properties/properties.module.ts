
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { Modals } from './components/modals/modals.component';
import { DropdownModule, ModalModule, TabsModule } from 'ng2-bootstrap';

import { routing } from './properties.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { PropertiesComponent } from './properties.component';
import { ActionsPropertyTableComponent, PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertyAddComponent } from './properties-list/property-add.component';
import { PropertyService } from './property.service';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { CustomerService } from '../customers/customer.service';
import { MyCommonModule } from '../../mycommon.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { PropertyEditComponent } from './properties-list/property-edit.component';
import { ValuationComponent } from './properties-list/valuation.component';
import {
  ActionsPropertyVisitTableComponent, PropertyVisitComponent,
  PropertyVisitDeleteComponent, PropertyVisitEditComponent, PropertyVisitViewComponent
} from "./properties-list/property-visit.component";
import {PropertiesMapComponent} from "./properties-list/properties-map.component";
import {PropertyViewComponent} from "./properties-list/property-view.component";

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
    MyCommonModule,
    NgxGalleryModule,
    routing
  ],
  entryComponents: [
    ActionsPropertyTableComponent,
    ActionsPropertyVisitTableComponent
  ],
  declarations: [
    ActionsPropertyTableComponent,
    ActionsPropertyVisitTableComponent,
    PropertyVisitEditComponent,
    PropertiesComponent,
    PropertiesListComponent,
    PropertyAddComponent,
    PropertyEditComponent,
    PropertiesMapComponent,
    ValuationComponent,
    PropertyVisitComponent,
    PropertyViewComponent,
    PropertyVisitDeleteComponent,
    PropertyVisitViewComponent
  ],
  providers: [
    PropertyService,
    CustomerService
  ]
})
export class PropertiesModule {}

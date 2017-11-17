import { RouterModule, Routes } from '@angular/router';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesComponent } from './properties.component';
import { PropertyAddComponent } from './properties-list/property-add.component';
import { PropertyEditComponent } from './properties-list/property-edit.component';
import { ValuationComponent } from './properties-list/valuation.component';
import {PropertyVisitComponent} from './properties-list/property-visit.component';
import {PropertiesMapComponent} from './properties-list/properties-map.component';
import {PropertyClosedComponent} from './properties-list/property-closed.component';
import {AccessGuard} from '../access-guard';

const routes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
    canActivate: [AccessGuard],
    children: [
      { path: '', component: PropertiesListComponent, data: { userRole: ['admin', 'agent'] }},
      { path: 'properties_list', component: PropertiesListComponent, data: { userRole: ['admin', 'agent'] }},
      { path: 'add_property', component: PropertyAddComponent, data: { userRole: ['admin', 'agent'] } },
      { path: 'edit_property/:property_id', component: PropertyEditComponent, data: { userRole: ['admin', 'agent'] } },
      { path: 'valuation', component: ValuationComponent, data: { userRole: ['admin', 'agent'] } },
      { path: 'map', component: PropertiesMapComponent, data: { userRole: ['admin', 'agent'] } },
      { path: 'visits', component: PropertyVisitComponent, data: { userRole: ['admin', 'agent'] } },
      { path: 'closed', component: PropertyClosedComponent, data: { userRole: ['admin', 'agent'] }}
    ]
  }
];

export const routing = RouterModule.forChild(routes);

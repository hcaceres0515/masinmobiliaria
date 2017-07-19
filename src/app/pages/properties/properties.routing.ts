import { RouterModule, Routes } from '@angular/router';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesComponent } from './properties.component';
import { PropertyAddComponent } from './properties-list/property-add.component';
import { PropertyEditComponent } from './properties-list/property-edit.component';
import { ValuationComponent } from './properties-list/valuation.component';
import {PropertyVisitComponent} from "./properties-list/property-visit.component";
import {PropertiesMapComponent} from "./properties-list/properties-map.component";

const routes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
    children: [
      { path: '', component: PropertiesListComponent },
      { path: 'properties_list', component: PropertiesListComponent },
      { path: 'add_property', component: PropertyAddComponent },
      { path: 'edit_property/:property_id', component: PropertyEditComponent },
      { path: 'valuation', component: ValuationComponent },
      { path: 'map', component: PropertiesMapComponent },
      { path: 'visits', component: PropertyVisitComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

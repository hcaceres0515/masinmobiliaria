import { RouterModule, Routes } from '@angular/router';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertiesComponent } from './properties.component';
import {PropertyAddComponent} from "./properties-list/property-add.component";
import {PropertyEditComponent} from "./properties-list/property-edit.component";

const routes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
    children: [
      { path: '', component: PropertiesListComponent },
      { path: 'properties_list', component: PropertiesListComponent },
      { path: 'add_property', component: PropertyAddComponent },
      { path: 'edit_property/:property_id', component: PropertyEditComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

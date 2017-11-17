import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from '../access-guard';
import { SliderComponent } from './slider/slider.component';
import { WebComponent } from './web.component';

const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    canActivate: [AccessGuard],
    children: [
      { path: '', component: SliderComponent, data: { userRole: ['admin', 'editor'] } },
      { path: 'slider', component: SliderComponent, data: { userRole: ['admin', 'editor'] } }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

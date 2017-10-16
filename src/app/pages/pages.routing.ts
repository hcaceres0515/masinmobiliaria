import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { Login } from './login/login.component';
import { AccessGuard } from './access-guard';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    // component: Login
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    canActivate: [AccessGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule'},
      { path: 'editors', loadChildren: 'app/pages/editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: 'app/pages/components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: 'app/pages/charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: 'app/pages/forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule' },
      { path: 'customers', loadChildren: 'app/pages/customers/customers.module#CustomerModule'},
      { path: 'properties', loadChildren: 'app/pages/properties/properties.module#PropertiesModule'},
      { path: 'users', loadChildren: 'app/pages/users/users.module#UsersModule'},
      { path: 'blog', loadChildren: 'app/pages/blog/blog.module#BlogModule'},
      { path: 'web', loadChildren: 'app/pages/web/web.module#WebModule'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

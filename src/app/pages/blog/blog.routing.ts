import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from '../access-guard';
import { BlogComponent } from './blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogCategoriesComponent } from './blog-list/blog-categories.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    canActivate: [AccessGuard],
    children: [
      { path: '', component: BlogListComponent, data: { userRole: ['admin'] } },
      { path: 'blog_list', component: BlogListComponent, data: { userRole: ['admin'] } },
      { path: 'blog_categories', component: BlogCategoriesComponent, data: { userRole: ['admin'] } }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { Modals } from './components/modals/modals.component';
import { DropdownModule, ModalModule, TabsModule } from 'ng2-bootstrap';

import { routing } from './blog.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { MyCommonModule } from '../../mycommon.module';
import { BlogComponent } from './blog.component';
import {ActionsBlogPostTableComponent, BlogListComponent} from './blog-list/blog-list.component';
import { BlogCategoriesComponent } from './blog-list/blog-categories.component';
import { BlogService } from './blog.service';
import { ConfirmModalBlogComponent } from './blog-list/confirm-modal-blog.component';
import { CKEditorModule } from 'ng2-ckeditor';
import {BlogEditPostComponent} from "./blog-list/blog-edit-post.component";

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
    CKEditorModule,
    MyCommonModule
  ],
  entryComponents: [
    ActionsBlogPostTableComponent,
  ],
  declarations: [
    ActionsBlogPostTableComponent,
    BlogComponent,
    BlogListComponent,
    BlogCategoriesComponent,
    ConfirmModalBlogComponent,
    BlogEditPostComponent
  ],
  providers: [
    BlogService
  ]

})
export class BlogModule {}

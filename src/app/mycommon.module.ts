import { UPLOAD_DIRECTIVES } from 'ng2-file-uploader/ng2-file-uploader';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ UPLOAD_DIRECTIVES ],
  exports: [ UPLOAD_DIRECTIVES ]
})
export class MyCommonModule{}

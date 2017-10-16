import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PropertyService } from '../property.service';
import { ModalDirective } from 'ng2-bootstrap';
import {BlogService} from "../blog.service";

@Component({
  selector: 'confirm-modal-blog',
  templateUrl: './confirm-modal-blog.html'
})


export class ConfirmModalBlogComponent {

  // Used to prevent duplicate dialogs
  @Input() id: string;
  // The dialog title

  @Input() confirmMessage: string;

  @Output() ok = new EventEmitter();

  // Data que se puede enviar para ejecutar en el output
  public data: any;

  @ViewChild('confirmPropertyModal') confirmBlogModal: ModalDirective;

  onOK() {
    this.ok.emit(this.data);
    this.hideConfirmModal();
  }

  constructor(private _blogService: BlogService) {
    console.log('init confirm modal');

    this._blogService.methodCallBlogModalConfirm$.subscribe(
      data => {
        this.data = data;
        // console.log(this.data);
        this.showConfirmModal();
      }
    );
  }
  showConfirmModal(): void {
    this.confirmBlogModal.show();
  }

  hideConfirmModal(): void {
    this.confirmBlogModal.hide();
  }
  /*
   showViewModal(): void {
   console.log('show confirm modal', this.title);
   this.ok.emit(null);
   }
   */
}

import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {PropertyService} from '../property.service';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.html'
})


export class ConfirmModalComponent {

  // Used to prevent duplicate dialogs
  @Input() id: string;
  // The dialog title

  @Input() confirmMessage: string;

  @Output() ok = new EventEmitter();

  @ViewChild('confirmPropertyModal') confirmPropertyModal: ModalDirective;

  onOK() {
    this.ok.emit(null);
    this.hideConfirmModal();
  }

  constructor(private _propertyService: PropertyService) {
    console.log('init confirm modal');

    this._propertyService.methodCallPropertyModalConfirm$.subscribe(
      data => {
        this.showConfirmModal();
      }
    );
  }
  showConfirmModal(): void {
    this.confirmPropertyModal.show();
  }

  hideConfirmModal(): void {
    this.confirmPropertyModal.hide();
  }
  /*
  showViewModal(): void {
    console.log('show confirm modal', this.title);
    this.ok.emit(null);
  }
  */
}

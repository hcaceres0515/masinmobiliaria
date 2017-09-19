
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PropertyService } from '../property.service';

import 'style-loader!../../tables/components/smartTables/smartTables.scss';
import {UserService} from "../../users/user.service";

@Component({
  selector: 'property-closed',
  templateUrl: 'property-closed.html'
})

export class PropertyClosedComponent implements OnInit{

  query: string = '';

  settings = {
    noDataMessage: 'No se encontraron registros.',
    actions: {
      position: 'right',
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: true
      },
      property_id: {
        title: 'Propiedad ID',
        type: 'string'
      },
      commission_percentage: {
        title: 'Comision(%)',
        type: 'string',
        filter: false
      },
      commission_amount: {
        title: 'Comision',
        type: 'string',
        filter: false
      },
      price: {
        title: 'Precio Total',
        type: 'string',
        filter: false
      },
      approve_date: {
        title: 'Fecha Aprobacion',
        type: 'number',
        filter: true
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  public userData: any;
  public users: any = [];
  public propertiesClosed: any = [];

  public selectedUser: any;

  public selectedDeleteEvent: any;

  constructor(private  _propertyService: PropertyService, private _userService: UserService) {

    this.userData = JSON.parse(localStorage.getItem('userData'));

  }

  onDeleteConfirm(event): void {
    /*if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }*/

    console.log(event);
    this.selectedDeleteEvent = event;
    this._propertyService.callShowConfirmModalService();

  }

  ngOnInit() {


    let rolId = this.userData.rol_id;

    if (rolId === '1') { // Only for admin

      this.getPropertiesClosedByOffice();
      this.getUsersByOffice();

    } else if (rolId === '2') {
      let userId = this.userData.id;
      this.getPropertiesClosedByUser(userId);
      this.settings.actions.delete = false;
    }

  }

  getUsersByOffice() {
    let officeId = this.userData.office_id;
    this._userService.getUsersByOffice(officeId).subscribe(
      (data) => { this.users = data },
      (error) => {},
      () => {}
    );
  }

  getPropertiesClosedByOffice() {
    let officeId = this.userData.office_id;

    this._propertyService.getPropertiesClosedByOffice(officeId).subscribe(
      (data) => { this.propertiesClosed = data;  },
      (error) => {},
      () => {
        console.log(this.propertiesClosed);
        this.source.load(this.propertiesClosed);
      }
    );
  }

  getPropertiesClosedByUser(userId) {

    this._propertyService.getPropertiesClosedByUser(userId).subscribe(
      (data) => { this.propertiesClosed = data;  },
      (error) => {},
      () => {
        console.log(this.propertiesClosed);
        this.source.load(this.propertiesClosed);
      }
    );
  }

  onChangeUser(event) {
    let userId = event.id;
    this.getPropertiesClosedByUser(userId);
  }

  deleteItem() {
    // console.log('hola', this.selectedDeleteEvent);
    let id = this.selectedDeleteEvent.data.id;
    this._propertyService.deletePropertyClosed(id).subscribe(
      (error) => {},
      () => {
        this.selectedDeleteEvent.confirm.resolve();
      }
    );
  }
}

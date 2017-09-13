
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PropertyService } from '../property.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Property } from '../property';
import { CONFIG_ENV } from '../../../app.config';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Component({
  selector: 'actions-property-visit-table',
  templateUrl: './actions-property-visit.html',
})

export class ActionsPropertyVisitTableComponent implements OnInit {

  @Input() value: any;
  @Input() rowData: any;

  public propertyVisit: any = {id: null, comments: ''};

  constructor(private _propertyService: PropertyService){}

  ngOnInit() {
    this.propertyVisit.id = this.value.id;
    this.propertyVisit.comments = this.value.comments;
  }

  showPropertyVisitDeleteModal(visitId){
    this._propertyService.callShowDeleteModalPropertyVisit(visitId);
  }

  showPropertyVisitEditModal(propertyVisit){
    this._propertyService.callShowEditPropertyVisit(propertyVisit);
  }

}

@Component({
  selector: 'property-visit-view',
  templateUrl: './property-visit-view.html',
})

export class PropertyVisitViewComponent implements OnInit {

  ngOnInit() {

  }

}


@Component({
  selector: 'property-visit-edit',
  templateUrl: './property-visit-edit.html',
})

export class PropertyVisitEditComponent implements OnInit {

  @ViewChild('editPropertyVisitModal') editPropertyVisitModal: ModalDirective;

  public propertyVisit: any = {id: null, comments: ''};

  constructor(private _propertyService: PropertyService){

    this._propertyService.methodCallPropertyVisitEdit$.subscribe(
      data => {
        this.propertyVisit = data;
        console.log(this.propertyVisit);
        this.showPropertyVisitEditModal();
      }
    );
  }

  ngOnInit() {

  }


  hidePropertyVisitEditModal(): void {
    this.editPropertyVisitModal.hide();
  }

  showPropertyVisitEditModal(): void {
    this.editPropertyVisitModal.show();
  }

  onEditPropertyVisit(propertyVisit) {
    this._propertyService.editPropertyVisit(propertyVisit).subscribe(
      (error) => alert(error),
      () => {
        this.hidePropertyVisitEditModal();
        this._propertyService.callReloadListPropertyVisit();
      }

    );
  }
}


@Component({
  selector: 'property-visit-delete',
  templateUrl: './property-visit-delete.html',
})

export class PropertyVisitDeleteComponent implements OnInit {

  @ViewChild('deletePropertyVisitModal') deletePropertyVisitModal: ModalDirective;

  private propertyVisit: any = {id: null, title: ''}

  constructor(private _propertyService: PropertyService){

    let propertyVisitId;

    this._propertyService.componentMethodCalled$.subscribe(
      data => {
        propertyVisitId = data;
        this.propertyVisit.id = propertyVisitId;
        this.showPropertyVisitDeleteModal();
      }
    );
  }

  ngOnInit() {

  }

  hidePropertyVisitDeleteModal(): void {
    this.deletePropertyVisitModal.hide();
  }

  showPropertyVisitDeleteModal(): void {
    this.deletePropertyVisitModal.show();
  }

  onDeletePropertyVisit(propertyVisitId) {

    this._propertyService.deletePropertyVisit(propertyVisitId).subscribe(
      error => alert(error),
      () => {
        this.hidePropertyVisitDeleteModal();
        this._propertyService.callReloadListPropertyVisit();
      }
    );

  }
}

@Component({
  selector: 'porperty-visit',
  templateUrl: 'property-visit.html'
})

export class PropertyVisitComponent implements  OnInit{

  @ViewChild('visitAddModal') visitAddModal: ModalDirective;

  PATH_SERVER = CONFIG_ENV._SERVER;

  public today: any;
  public dateFrom: any;
  public dateTo: any;
  public propertyId: string;
  public invalidPropertyMessage: string;
  public invalidPropertyVisitMessage: string;
  public customerSelected: any = {id: '', name: '', email: '', first_phone: ''};
  public propertyData: Property;
  public userData: any;
  public propertyVisit: any = {user_id: null, property_id: null, customer_id: null, comments: ''};
  public loadingIcon: boolean = false;
  public invalidProperty: boolean = false;
  public invalidPropertyVisit: boolean = false;

  settings = {
    noDataMessage: 'No se encontraron registros.',
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      property_id: {
        title: 'Cod. Pro.',
        type: 'number',
        filter: false
      },
      customer_name: {
        title: 'Cliente',
        type: 'string',
        filter: false
      },
      title: {
        title: 'Propiedad',
        type: 'string',
        filter: false
      },
      address: {
        title: 'Dirección',
        type: 'string',
        filter: false
      },
      comments: {
        title: 'Comentario',
        type: 'string',
        filter: false
      },
      createdAt: {
        title: 'Fecha',
        type: 'string',
        filter: false
      },
      item: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ActionsPropertyVisitTableComponent,
        filter: false
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  public properties: any[] = [];

  constructor(private _propertyService: PropertyService, private _http: Http) {
    this.propertyData = new Property(null, null, null, '', 1, 1, 1, 1, 1, 1, 1, 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, null, '', null, null, null, null, null, []);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.propertyVisit.user_id = this.userData.id;

    this._propertyService.componentMethodCallPropertyVisit$.subscribe(
      () => {
        this.getPropertyVisits(0, this.today, this.today);
      }
    );
  }

  ngOnInit() {

    //let today: Date;

    this.today = new Date();
    this.today = this.formatDate(this.today);
    console.log(this.today);

    this.dateFrom = this.today;
    this.dateTo = this.today;

    this.getPropertyVisits(0, this.today, this.today);

  }

  showVisitAddModal(): void {
    this.visitAddModal.show();
  }

  hideVisitAddModal(): void {
    this.propertyId = '';
    this.propertyData = new Property(null, null, null, '', 1, 1, 1, 1, 1, 1, 1, 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, null, '', null, null, null, null, null, []);
    this.visitAddModal.hide();
  }

  sourceLoadTable(data) {

    Object(data).forEach((value) => {

      value.item = {id: value.id, user_id: value.user_id, property_id: value.property_id, customer_id: value.customer_id, comments: value.comments};
    });
    console.log(data);
    return data;
  }

  getPropertyVisits(propertyId, dateFrom, dateTo) {
    this._propertyService.getPropertyVisits(this.userData.id, propertyId, dateFrom, dateTo).subscribe(
      data => this.properties = data,
      error => alert(error),
      () => {

        this.source.load(this.sourceLoadTable(this.properties));
      }
    );
  }

  searchPropertyVisit(propertyId) {

    if (propertyId === ''){
      propertyId = 0;
    }

    if (this.dateFrom === ''){
      this.dateFrom = this.today;
    }

    if (this.dateTo === ''){
      this.dateTo = this.today;
    }

    this.getPropertyVisits(propertyId, this.dateFrom, this.dateTo);
  }

  searchProperty() {
    // console.log(this.propertyId);

    if (this.propertyId != null) {
      this.loadingIcon = true;

      this._propertyService.getPropertyInfoById(this.propertyId).subscribe(
        data => this.propertyData = data,
        (error) => {
          this.invalidProperty = true;
          this.invalidPropertyMessage = 'El código de la propiedad no existe';
          this.loadingIcon = false;
          setTimeout(function() {
            this.invalidProperty = false;
          }.bind(this), 3000);
        },
        () => {
          if (this.userData.id !== this.propertyData.user_id) {
            this.invalidProperty = true;
            this.invalidPropertyMessage = 'Usted no registró la propiedad';
            setTimeout(function() {
              this.invalidProperty = false;
            }.bind(this), 3000);
            this.loadingIcon = false;
            this.propertyData = new Property(null, null, null, '', 1, 1, 1, 1, 1, 1, 1, 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, null, '', null, null, null, null, null, []);
          } else {
            this.propertyVisit.property_id = this.propertyData.id;
            this.loadingIcon = false;
          }
        }
      );
    }
  }

  observableSource = (keyword: any): Observable<any[]> => {
    let url: string =
      this.PATH_SERVER + '&c=customer&m=get_customer_by_keyword&user_id=' + this.userData.id + '&keyword=' + keyword
    if (keyword) {
      let json;
      return this._http.get(url)
        .map(res => {
          let json = res.json();
          return json;
        });
    } else {
      return Observable.of([]);
    }
  }

  onKeydownCustomer(event){

    if (event.charCode === 0){
      this.propertyVisit.customer_id = null;
    }
  }

  onCustomerSelected(customer) {
    this.propertyVisit.customer_id = customer.id;
  }

  addPropertyVisit() {

    this.invalidPropertyVisitMessage = '';

    if (this.propertyData.id == null) {
      this.invalidPropertyVisit = true;
      this.invalidPropertyVisitMessage = '*Seleccione una propiedad';
    }

    if (this.propertyVisit.customer_id === null || this.propertyVisit.customer_id === '') {
      this.invalidPropertyVisit = true;
      this.invalidPropertyVisitMessage = this.invalidPropertyVisitMessage + '  ----  *Seleccione un cliente';

    }

    if (!this.invalidPropertyVisit){

      this.loadingIcon = true;
      this._propertyService.addPropertyVisit(this.propertyVisit).subscribe(
        (error) => alert(error),
        () => {
          this.loadingIcon = false;
          this.hideVisitAddModal();
          this.propertyId = '';
          this.propertyVisit = {user_id: null, property_id: null, customer_id: null, comments: ''};
          this.propertyData = new Property(null, null, null, '', 1, 1, 1, 1, 1, 1, 1, 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, null, '', null, null, null, null, null, []);
          this.customerSelected = {id: '', name: '', email: '', first_phone: ''};

          this.getPropertyVisits(0, this.today, this.today);
        }
      );

    }

    setTimeout(function() {
      this.invalidPropertyVisit = false;
    }.bind(this), 3000);
  }

  onlyNumberKey(event) {

    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  formatDate(date) {

    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}

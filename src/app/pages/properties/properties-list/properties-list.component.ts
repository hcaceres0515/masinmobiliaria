import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { PropertyService } from '../property.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Property } from '../property';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { CustomerService } from '../../customers/customer.service';
import { CONFIG_ENV } from '../../../app.config';
import { AuthService } from '../../auth-service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'actions-property-table',
  templateUrl: './actions-property.html',
  styles: ['.alert-danger { padding: 5px 10px; margin-top: 5px; font-size: 10px} ']
})
export class ActionsPropertyTableComponent implements ViewCell, OnInit {

  @ViewChild('viewPropertyModal') viewPropertyModal: ModalDirective;
  @ViewChild('sendPropertyModal') sendPropertyModal: ModalDirective;
  @ViewChild('deletePropertyModal') deletePropertyModal: ModalDirective;

  @Input() value: any;
  @Input() rowData: any;

  PATH_SERVER = CONFIG_ENV._SERVER;

  property: any;
  propertyData: Property;
  userData: any;
  actionPermission: boolean = false;
  loadingIcon: boolean = false;

  selected: any;

  dataSendProperty = {property_id: '', customer_id: '', customer_email: '', message: ''};

  constructor(private _http: Http, private _customerService: CustomerService, private _propertyService: PropertyService, private _authService: AuthService) {
    this.propertyData = new Property(1, 1, null, '', 1, 1, 1, 1, 1, 1, 1, 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, null, '', null, null, null, null, []);

    this.userData = this._authService.getUserData();
  }

  ngOnInit() {
    this.property = this.value;

    if (this.value.user_id === this.userData.id || this.userData.rol_name === 'admin') {
      this.actionPermission = true;
    }

  }

  showViewModal(propertyId): void {
    this._propertyService.callShowViewModalService(propertyId);
  }

  hideViewModal(): void {
    this.viewPropertyModal.hide();
  }

  showSendPropertyModal(): void {
    this.dataSendProperty.property_id = this.property.id;
    this.selected = '';
    this.sendPropertyModal.show();
  }

  hideSendPropertyModal(): void {
    this.dataSendProperty = {property_id: '', customer_id: '', customer_email: '', message: ''};
    this.sendPropertyModal.hide();
  }

  showPropertyDeleteModal(): void {
    this.deletePropertyModal.show();
  }

  hidePropertyDeleteModal(): void {
    this.deletePropertyModal.hide();
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
        })
    } else {
      return Observable.of([]);
    }
  }

  onCustomerSelected(event) {
    console.log(event);
    this.dataSendProperty.customer_id = event.id;
    this.dataSendProperty.customer_email = event.email;
  }

  onSendProperty() {

    this.loadingIcon = true;

    let propertyId = this.dataSendProperty.property_id;
    let customerId = this.dataSendProperty.customer_id;
    let userId = this.userData.id;
    let message = this.dataSendProperty.message;

    this._propertyService.sendPropertyByEmail(propertyId, customerId, userId, message).subscribe(
      error => alert(error),
      () => {
        this.dataSendProperty = {property_id: '', customer_id: '', customer_email: '', message: ''};
        this.loadingIcon = false;
        this.hideSendPropertyModal();
      }
    );
  }

  onDeleteProperty(propertyId) {
    this._propertyService.deleteProperty(propertyId).subscribe(
      (error) => alert(error),
      () => {
        this._propertyService.callReloadListProperty();
        this.hidePropertyDeleteModal();
      }
    );
  }
}


@Component({
  selector: 'properties-list',
  templateUrl: './properties-list.html',
  styles: ['legend { width: auto!important; margin-bottom: 1.5rem; }']
})

export class PropertiesListComponent implements  OnInit {

  settings = {
    noDataMessage: 'No se encontraron registros.',
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'Cod',
        type: 'number',
        filter: false
      },
      username: {
        title: 'Agente',
        type: 'string',
        filter: false
      },
      title: {
        title: 'Titulo',
        type: 'string',
        filter: false
      },
      department_name: {
        title: 'Departamento',
        type: 'string',
        filter: false
      },
      province_name: {
        title: 'Provincia',
        type: 'string',
        filter: false
      },
      district_name: {
        title: 'Distrito',
        type: 'string',
        filter: false
      },
      property_type_name: {
        title: 'Tipo',
        type: 'string',
        filter: false
      },
      property_status_name: {
        title: 'Estado',
        type: 'string',
        filter: false
      },
      property_contract_name: {
        title: 'Contrato',
        type: 'string',
        filter: false
      },
      price: {
        title: 'Precio',
        type: 'string',
        filter: false
      },
      commission_amount: {
        title: 'Comision',
        type: 'string',
        filter: false
      },
      createdAt: {
        title: 'Fecha de registro',
        type: 'string',
        filter: false
      },
      item: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ActionsPropertyTableComponent,
        filter: false
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  properties: any[];
  users: any[];
  userData: any;
  departments: any[]= [];
  provinces: any[] = [];
  districts: any[] = [];
  propertyContract: any[];
  propertyStatus: any[];
  propertyType: any[];
  propertyCoin: any[];

  propertiesByLocationFilter: any[] = []; //Save data from location filter
  propertiesByFeaturesFilter: any[] = []; // Save data from second filter

  selectedDepartment: any;
  selectedProvince: any;
  selectedDistrict: any;
  selectedPropertyContract: any = {id: ''}; //Id for todos option
  selectedPropertyStatus: any = {id: ''};
  selectedPropertyType: any = {id: ''};
  selectedPropertyCoin: any;
  selectedUser: any;

  filterOption: any = '1'; // For filter my properties or all properties
  loadingIcon: boolean = true;
  minimumPrice: number;
  maximumPrice: number;

  constructor(private _propertyService: PropertyService, private _userService: UserService, private _http: Http) {

    this._propertyService.componentMethodCallProperty$.subscribe(
      () => {
        this.getPropertiesByUser();
      }
    );
  }

  ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('userData'));

    this.getPropertiesByUser();
    this.getAllUsers();
    this.getDepartments();
    this.getPropertyContract();
    this.getPropertyType();
    this.getPropertyStatus();
    this.getCoinType();
  }

  getPropertiesByUser() {

    this._propertyService.getPropertiesByUser(this.userData.id).subscribe(
      data => this.properties = (data),
      error => alert(error),
      () => {
        // console.log(this.properties);
        let propertiesfilter = this.properties.filter( property => property.user_id === '2');
        // console.log(propertiesfilter);
        this.properties = this.sourceLoadTable(this.properties);
        this.source.load(this.properties);
        this.loadingIcon = false;
      }
    );
  }

  sourceLoadTable(data) {

    Object(data).forEach((value) => {
     value.item = { id: value.id, user_id: value.user_id, title: value.title };
    });

    this.propertiesByLocationFilter = data;
    this.propertiesByFeaturesFilter = data;
    return data;
  }

  getDepartments() {
    this._propertyService.getDepartments().subscribe(
      data => this.departments = (data),
      error => alert(error),
      () => {
        this.departments.unshift({id: 0, name: 'TODOS'});
        this.selectedDepartment = this.departments[0];

        this.provinces.push({id: 0, name: 'TODOS'});
        this.selectedProvince = this.provinces[0];

        this.districts.push({id: 0, name: 'TODOS'});
        this.selectedDistrict = this.districts[0];
      }
    );
  }

  getAllUsers() {
    this._userService.getAllUsers().subscribe(
      (data) => this.users = data,
      (error) => alert(error),
      () => {

      }
    );
  }

  getPropertyContract() {
    this._propertyService.getPropertyContract().subscribe(
      data => this.propertyContract = (data),
      error => alert(error),
      () => {
      }
    );
  }

  getPropertyStatus() {
    this._propertyService.getPropertyStatus().subscribe(
      data => this.propertyStatus = (data),
      error => alert(error),
      () => {
      }
    );
  }

  getPropertyType() {
    this._propertyService.getPropertyType().subscribe(
      data => this.propertyType = (data),
      error => alert(error),
      () => {
      }
    );
  }

  getCoinType() {
    this._propertyService.getPropertyCoin().subscribe(
      (data) => this.propertyCoin = data,
      (error) => alert(error),
      () => {
        this.selectedPropertyCoin = this.propertyCoin[0];
      }
    );
  }

  onChangeCoin(coin) {
    let properties;

  }

  onChangeUser(user) {
    this._propertyService.getPropertiesByUser(user.id).subscribe(
      (data) => this.properties = data,
      (error) => alert(error),
      () => {
        this.source.load(this.sourceLoadTable(this.properties));
      }
    );
  }

  onChangeUserFilter(opt) {
    if (opt === '1') {
      this._propertyService.getPropertiesByUser(this.userData.id).subscribe(
        data => this.properties = (data),
        error => alert(error),
        () => {
          this.source.load(this.sourceLoadTable(this.properties));
        }
      );
    } else {
      this._propertyService.getProperties().subscribe(
        data => this.properties = (data),
        error => alert(error),
        () => {
          this.source.load(this.sourceLoadTable(this.properties));
        }
      );
    }

    this.getDepartments();
    this.selectedPropertyType = {id: ''};
    this.selectedPropertyStatus = {id: ''};
    this.selectedPropertyContract = {id: ''};
  }

  resetFilters() {
    this.getPropertiesByUser();
    this.getDepartments();
    this.filterOption = '1'; // Select first option
    this.selectedPropertyType = {id: ''}; //Ya no se consume el servicio, solo se deselecciona la opcion
    this.selectedPropertyStatus = {id: ''};
    this.selectedPropertyContract = {id: ''};
    this.selectedUser = null;
    this.selectedPropertyCoin = null;
    this.loadingIcon = false;
    this.maximumPrice = null;
    this.minimumPrice = null;
  }



  onChangeDepartment(department) {
    this._propertyService.getProvinceByDepartment(department.id).subscribe(
      data => this.provinces = (data),
      error => alert(error),
      () => {
        this.provinces.unshift({id: 0, name: 'TODOS'});
        this.selectedProvince = this.provinces[0];
      }
    );
  }

  onChangeProvince(province) {
    this._propertyService.getDistrictByProvince(province.id).subscribe(
      data => this.districts = (data),
      error => alert(error),
      () => {
        // this.selectedDistrict = this.districts[0];
      }
    );
  }

  onChangeDistrict(district) {
    let properties;
    properties = this.properties.filter( property =>  property.district_id === district.id);

    // this.properties = properties;
    this.source.load(properties);
  }

  onChangeFilterProperty() {

    let propertiesData = this.propertiesByLocationFilter;
    let properties;

    if (this.selectedPropertyType.id !== '' && this.selectedPropertyStatus.id !== '' && this.selectedPropertyContract.id !== '') {

      properties = propertiesData.filter(
        property => (property.property_type_id === this.selectedPropertyType.id
                    && property.property_status_id === this.selectedPropertyStatus.id
                    && property.property_contract_id === this.selectedPropertyContract.id)
      );

    } else if (this.selectedPropertyType.id !== '' && this.selectedPropertyStatus.id !== '') {

        properties = propertiesData.filter(
          property => (property.property_type_id === this.selectedPropertyType.id
          && property.property_status_id === this.selectedPropertyStatus.id)
        );

    } else if (this.selectedPropertyStatus.id !== '' && this.selectedPropertyContract.id !== '') {

      properties = propertiesData.filter(
        property => (property.property_type_id === this.selectedPropertyStatus.id
        && property.property_contract_id === this.selectedPropertyContract.id)
      );

    } else if (this.selectedPropertyType.id !== '' && this.selectedPropertyContract.id !== '') {

      properties = propertiesData.filter(
        property => (property.property_type_id === this.selectedPropertyType.id
        && property.property_contract_id === this.selectedPropertyContract.id)
      );

    } else if (this.selectedPropertyType.id !== '') {

      properties = propertiesData.filter(
        property => (property.property_type_id === this.selectedPropertyType.id)
      );

    } else if (this.selectedPropertyStatus.id !== '') {

      properties = propertiesData.filter(
        property => (property.property_status_id === this.selectedPropertyStatus.id)
      );

    } else if (this.selectedPropertyContract.id !== '') {

      properties = propertiesData.filter(
        property => (property.property_contract_id === this.selectedPropertyContract.id)
      );

    }

    this.propertiesByFeaturesFilter = properties;
    this.source.load(properties);
  }

  onLocationFilter() {

    let propertiesFilter;

    if ((this.selectedDepartment.id !== 0) && (this.selectedProvince.id !== 0) && (this.selectedDistrict.id !== 0)) {

      propertiesFilter = this.properties.filter(
        property => (property.department_id === this.selectedDepartment.id
                      && property.province_id === this.selectedProvince.id
                      && property.district_id === this.selectedDistrict.id));

    } else if ((this.selectedDepartment.id !== 0) && (this.selectedProvince.id !== 0)) {

      propertiesFilter = this.properties.filter(
        property => (property.department_id === this.selectedDepartment.id
                    && property.province_id === this.selectedProvince.id));

    } else if ((this.selectedDepartment.id !== 0)) {

      propertiesFilter = this.properties.filter(
        property => (property.department_id === this.selectedDepartment.id));

    } else {
      propertiesFilter = this.properties;
    }

    this.source.load(propertiesFilter);

    this.propertiesByLocationFilter = propertiesFilter;

    /*
    this.source.getElements().then(function (result) {
      this.properties = result;
    });*/
  }

  onPriceFilter() {

    let propertiesData = this.propertiesByFeaturesFilter;
    let propertiesFilter;

    let coinId = this.selectedPropertyCoin.id;

    if (this.minimumPrice != null && this.maximumPrice != null) {

      propertiesFilter = propertiesData.filter(
        property => (parseFloat(property.price) > this.minimumPrice && parseFloat(property.price) <= this.maximumPrice) && property.property_coin_id === coinId);

    } else if (this.minimumPrice != null && this.maximumPrice == null) {

      propertiesFilter = propertiesData.filter(
        property => (parseFloat(property.price) > this.minimumPrice) && property.property_coin_id === coinId);

    } else if (this.minimumPrice == null && this.maximumPrice != null) {

      propertiesFilter = propertiesData.filter(
        property => (parseFloat(property.price) <= this.maximumPrice) && property.property_coin_id === coinId);

    } else {
      propertiesFilter = propertiesData;
    }

    this.source.load(propertiesFilter);
  }
}

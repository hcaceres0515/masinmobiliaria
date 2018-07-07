import {Component, ElementRef, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { Property } from '../property';
import { PropertyService } from '../property.service';
import { Observable } from 'rxjs';
import { CONFIG_ENV } from '../../../app.config';
import { Http } from '@angular/http';
import * as GoogleMapsLoader from 'google-maps';

@Component({
  selector: 'property-edit',
  templateUrl: 'property-edit.html',
  styles: [`
    #images {
      display: inline-block;      
      /*width: 300px;*/
      height: auto;
      position: relative;
      /*max-height: 400px;*/
    }

    .del_photo {
      display: inline-block;
      float:right;
      margin:5px 5px 0 0;
      position: absolute;
      top: 0;
      right: 0;
    }
    
  `],
})

export class PropertyEditComponent implements  OnInit {

  public sub;
  public propertyId: number;
  public propertyData: Property;
  public userData: any;

  public PATH_SERVER = CONFIG_ENV._SERVER;

  public departments: any[];
  public provinces: any[];
  public districts: any[];
  public propertyContract: any[];
  public propertyStatus: any[];
  public propertyType: any[];
  public propertyCoin: any[];

  public selectedDepartment: any;
  public selectedProvince: any;
  public selectedDistrict: any;
  public selectedPropertyContract: any;
  public selectedPropertyStatus: any;
  public selectedPropertyType: any;
  public selectedPropertyCoin: any;
  public selectedCustomer: any = {id: '', name: '', email: '', first_phone: ''};

  public loadingIcon: boolean = false;
  public loadedData: boolean = false;
  public submitted: boolean = false;
  public edited: boolean = false;
  public notificationsConfig: boolean = false;

  public selectedCustomerFlag: boolean = true;

  public propertyCloseStatus: any = {id: null, name: ''};
  public actionsMessage: string;
  public actionsShow: boolean = false;

  public confirmModalTitle: string = '';
  public confirmModalAction: string;

  public disabledBtnSave: boolean = false;

  public uploadFile: any;
  public uploadProgress: number;
  public uploadResponse: Object;
  public zone: NgZone;
  public options: any;

  constructor(private _activeRoute: ActivatedRoute, private _propertyService: PropertyService, private _http: Http, private _elementRef: ElementRef, private _router: Router) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit() {

    this.sub = this._activeRoute.params.subscribe(params => {
      this.propertyId = +params['property_id']; // (+) converts string 'id' to a number
    });

    this.options = {
      url: this.PATH_SERVER + '&c=property&m=upload_image',
      params: { 'property_id': this.propertyId }
    };

    this.uploadProgress = 0;
    this.uploadResponse = {};
    this.zone = new NgZone({ enableLongStackTrace: false });

    this.propertyData = new Property(1, 1, null, '', 1, 1, 1, 1, 1, 1, 1, 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, null, '', null, null, null, null, null, []);

    this._propertyService.getPropertyInfoById(this.propertyId).subscribe(
      data => this.propertyData = data,
      (error) => alert(error),
      () => {

        if (this.propertyData.user_id !== this.userData.id && this.userData.rol_name === 'agent') {
          this._router.navigate(['/pages/properties']);

        } else {

          this.loadedData = true;
          this.selectedCustomer.id = this.propertyData.customer_id;
          this.selectedCustomer.name = this.propertyData.customer_name;
          this.selectedCustomer.email = this.propertyData.customer_email;
          this.propertyData.report_visits = Number(this.propertyData.report_visits);
          this.propertyData.report_date = (!this.propertyData.report_visits) ? this.calculateNewDate('0') : this.propertyData.report_date;
          this.notificationsConfig = (this.propertyData.report_visits) ? true : false;
          this.ngloadMap();
          this.getDepartments();
          this.getPropertyContract();
          this.getPropertyStatus();
          this.getPropertyType();
          this.getPropertyCoin();

          this.propertyCloseStatus = this._propertyService.propertyStatus.filter(
            status => status.id === Number(this.propertyData.status))[0];

          console.log(this.propertyData);
        }
      }
    );
  }

  ngloadMap() {

    let el = this._elementRef.nativeElement.querySelector('.google-maps');

    // TODO: do not load this each time as we already have the library after first attempt
    GoogleMapsLoader.load((google) => {
      let map = new google.maps.Map(el, {
        center: new google.maps.LatLng(parseFloat(this.propertyData.lat), parseFloat(this.propertyData.lng)),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      let myLatlng: any = {lat: parseFloat(this.propertyData.lat), lng: parseFloat(this.propertyData.lng)};
      let latitude;
      let longitude;

      let searchBox;

      let marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Click to zoom'
      });


      google.maps.event.addListener(map, 'click', addMarkerMap.bind(this));

      function addMarkerMap(event) {

        latitude = event.latLng.lat();
        longitude = event.latLng.lng();

        let latlng = new google.maps.LatLng(latitude, longitude);
        marker.setPosition(latlng);
        this.selectedLat = latitude;
        this.selectedLng = longitude;
      }

      // Create the search box and link it to the UI element.
      let input = document.getElementById('pac-input');
      searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      let markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        let places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        let bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log('Returned place contains no geometry');
            return;
          }
          let icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });

    });
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

  onCustomerSelected(customer) {
    this.selectedCustomer = customer;
    this.propertyData.customer_id = customer.id;

    if ( this.propertyData.customer_id == null){
      this.selectedCustomerFlag = false;
    } else {
      this.selectedCustomerFlag = true;
    }

  }


  handleUpload(data): void {
    this.uploadFile = data;
    this.zone.run(() => {
      this.uploadProgress = data.progress.percent;
    });
    let resp = data.response;
    if (resp) {
      resp = JSON.parse(resp);
      this.uploadResponse = resp;
      this.propertyData.images.push(resp);
    }
  }

  handleChangeNotifications(value) {

    // this.propertyData.report_date = this.calculateNewDate('0');
    if (value) {
      this.notificationsConfig = true;
    } else {
      // this.propertyData.report_days = '0';
      this.notificationsConfig = false;
    }
  }

  updateCommisionAmmount() {

    if (this.propertyData.price !== '' && this.propertyData.commission_percentage !== '') {

      this.propertyData.commission_amount = (parseFloat(this.propertyData.price) * (parseFloat(this.propertyData.commission_percentage) / 100)).toString();
    } else {
      this.propertyData.commission_amount = '';
    }
  }

  updateNotificationDate(days) {
    let formatDate = this.calculateNewDate(days);
    this.propertyData.report_date = formatDate;
  }

  calculateNewDate(days: string) {

    let newdays = Number(days);
    // let date = new Date(stringDate);
    let date = new Date();
    let newDate = new Date(date.setDate(date.getDate() + newdays));
    let formatted = this.formatDate(newDate);

    return formatted;
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

  getDepartments() {
    this._propertyService.getDepartments().subscribe(
      data => this.departments = (data),
      error => alert(error),
      () => {
        let index = this.departments.map(function(e) { return e.id; }).indexOf(this.propertyData.department_id);
        this.selectedDepartment = this.departments[index];
        this.onChangeDepartment(this.selectedDepartment);
      }
    );
  }

  getPropertyContract() {
    this._propertyService.getPropertyContract().subscribe(
      data => this.propertyContract = (data),
      error => alert(error),
      () => {
        let index = this.propertyContract.map(function(e) { return e.id; }).indexOf(this.propertyData.property_contract_id);
        this.selectedPropertyContract = this.propertyContract[index];
      }
    );
  }

  getPropertyStatus() {
    this._propertyService.getPropertyStatus().subscribe(
      data => this.propertyStatus = (data),
      error => alert(error),
      () => {
        let index = this.propertyStatus.map(function(e) { return e.id; }).indexOf(this.propertyData.property_status_id);
        this.selectedPropertyStatus = this.propertyStatus[index];
      }
    );
  }

  getPropertyType() {
    this._propertyService.getPropertyType().subscribe(
      data => this.propertyType = (data),
      error => alert(error),
      () => {
        let index = this.propertyType.map(function(e) { return e.id; }).indexOf(this.propertyData.property_type_id);
        this.selectedPropertyType = this.propertyType[index];
      }
    );
  }

  getPropertyCoin() {
    this._propertyService.getPropertyCoin().subscribe(
      data => this.propertyCoin = (data),
      error => alert(error),
      () => {
        let index = this.propertyCoin.map(function(e) { return e.id; }).indexOf(this.propertyData.property_coin_id);
        this.selectedPropertyCoin = this.propertyCoin[index];
      }
    );
  }

  onChangeDepartment(department) {
    this._propertyService.getProvinceByDepartment(department.id).subscribe(
      data => this.provinces = (data),
      error => alert(error),
      () => {
        if (this.loadedData) {
          let index = this.provinces.map(function(e) { return e.id; }).indexOf(this.propertyData.province_id);
          this.selectedProvince = this.provinces[index];
        } else {
          this.selectedProvince = this.provinces[0];
        }
        this.onChangeProvince(this.selectedProvince);
      }
    );
  }

  onChangeProvince(province) {
    this._propertyService.getDistrictByProvince(province.id).subscribe(
      data => this.districts = (data),
      error => alert(error),
      () => {
        if (this.loadedData) {
          let index = this.districts.map(function(e) { return e.id; }).indexOf(this.propertyData.district_id);
          this.selectedDistrict = this.districts[index];
        } else {
         this.selectedDistrict = this.districts[0];
        }
        this.loadedData = false;
      }
    );
  }

  deletePropertyImage(imageId) {

    this.loadingIcon = true;
    this._propertyService.deletePropertyImage(imageId).subscribe(
      (error) => {},
      () => {
        let index = this.propertyData.images.map(function(e) { return e.id; }).indexOf(imageId);
        this.propertyData.images.splice(index, 1);
        this.loadingIcon = false;
      }
    );
  }

  editProperty(addForm) {

    this.propertyData.title = this.propertyData.title.toUpperCase();
    this.propertyData.property_type_id = this.selectedPropertyType.id;
    this.propertyData.property_status_id = this.selectedPropertyStatus.id;
    this.propertyData.property_contract_id = this.selectedPropertyContract.id;
    this.propertyData.department_id = this.selectedDepartment.id;
    this.propertyData.province_id = this.selectedProvince.id;
    this.propertyData.district_id = this.selectedDistrict.id;
    this.propertyData.property_coin_id = this.selectedPropertyCoin.id;
    this.submitted = true;

    // console.log(this.propertyData);

    if (addForm.valid && this.selectedCustomerFlag) {

      this.disabledBtnSave = true;

      this.loadingIcon = true;
      this.edited = true;

      this._propertyService.editProperty(this.propertyData).subscribe(
        (error) => alert(error),
        () => {
          this.loadingIcon = false;
          this.disabledBtnSave = false;
          setTimeout(function() {
            this.edited = false;
          }.bind(this), 3000);
        }
      );
    }
  }

  closeProperty() {

    this.actionsShow = true;
    this.propertyData.status = 2;

    this.propertyCloseStatus = this._propertyService.propertyStatus.filter(
      status => status.id === Number(this.propertyData.status))[0];

    this.actionsMessage = 'La propiedad ha pasado a un estado pendiente de aprobación.';

    this._propertyService.changeStatusProperty(this.propertyData.id, 2, this.propertyData.office_id, this.propertyData.user_id).subscribe(
      (error) => { console.log(error); },
      () => {}
    );

    setTimeout(function() {
      this.actionsShow = false;
      this.actionsMessage = '';
    }.bind(this), 3000);

  }

  approveCloseProperty() {

    this.actionsShow = true;

    this._propertyService.changeStatusProperty(this.propertyData.id, 3, this.propertyData.office_id, this.userData.id).subscribe(
      (error) => { console.log(error); },
      () => {

        this.propertyData.status = 3;
        this.selectedPropertyContract = this.propertyContract[1];

        this.propertyCloseStatus = this._propertyService.propertyStatus.filter(
          status => status.id === Number(this.propertyData.status))[0];

        this.actionsMessage = 'La solicitud de cierre de la propiedad ha sido aceptada.';
        setTimeout(function() {
          this.actionsShow = false;
          this.actionsMessage = '';
        }.bind(this), 3000);
      }
    );
  }

  deniedCloseProperty() {

    this._propertyService.changeStatusProperty(this.propertyData.id, 1, this.propertyData.office_id, this.userData.id).subscribe(
      (error) => { console.log(error); },
      () => {
        this.actionsMessage = 'La solicitud de cierre de la propiedad ha sido cancelada.';

        this.propertyData.status = 1;

        this.propertyCloseStatus = this._propertyService.propertyStatus.filter(
          status => status.id === Number(this.propertyData.status))[0];

        setTimeout(function() {
          this.actionsShow = false;
          this.actionsMessage = '';
        }.bind(this), 3000);
      }
    );
  }

  activateProperty() {

    this.actionsShow = true;

    this._propertyService.changeStatusProperty(this.propertyData.id, 1, this.propertyData.office_id, this.userData.id).subscribe(
      (error) => { console.log(error); },
      () => {

        this.propertyData.status = 1;
        this.selectedPropertyContract = this.propertyContract[0]; // active

        this.propertyCloseStatus = this._propertyService.propertyStatus.filter(
          status => status.id === Number(this.propertyData.status))[0];

        this.actionsMessage = 'La propiedad ha sido activada, ahora estara visible en la pagina web.';
        setTimeout(function() {
          this.actionsShow = false;
          this.actionsMessage = '';
        }.bind(this), 3000);
      }
    );
  }

  confirmModal(modal) {

    if (modal === 'closeProperty') {

      this.confirmModalAction = 'closeProperty'; // Nombre de la funcion, que va hacer llamada
      this.confirmModalTitle = 'Esta seguro de cerrar la propiedad'; // Mensaje para el modal de confirmacion

    } else if (modal === 'approveCloseProperty') {

      this.confirmModalAction = 'approveCloseProperty'; // Nombre de la funcion, que va hacer llamada
      this.confirmModalTitle = 'Esta seguro de aprobar el cierre propiedad'; // Mensaje para el modal de confirmacion

    } else if (modal === 'deniedCloseProperty') {

      this.confirmModalAction = 'deniedCloseProperty'; // Nombre de la funcion, que va hacer llamada
      this.confirmModalTitle = 'Esta seguro de cancelar el cierre propiedad'; // Mensaje para el modal de confirmacion

    } else if (modal === 'activateProperty') {

      this.confirmModalAction = 'activateProperty'; // Nombre de la funcion, que va hacer llamada
      this.confirmModalTitle = 'Esta seguro de activar la propiedad'; // Mensaje para el modal de confirmacion
    }


    this._propertyService.callShowConfirmModalService();
  }

}

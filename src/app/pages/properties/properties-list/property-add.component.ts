import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Property } from '../property';
import { CONFIG_ENV } from '../../../app.config';
import * as GoogleMapsLoader from 'google-maps';

@Component({
  selector: 'property-add',
  templateUrl: 'property-add.html',
})

export class PropertyAddComponent implements  OnInit{

  PATH_SERVER = CONFIG_ENV._SERVER;

  userData: any;
  propertyData: Property;

  departments: any[];
  provinces: any[];
  districts: any[];
  propertyContract: any[];
  propertyStatus: any[];
  propertyType: any[];
  propertyCoin: any[];

  selectedDepartment: any;
  selectedProvince: any;
  selectedDistrict: any;
  selectedPropertyContract: any;
  selectedPropertyStatus: any;
  selectedPropertyType: any;
  selectedPropertyCoin: any;
  selectedCustomer: any = {id: '', name: '', email: '', first_phone: ''};

  selectedLat: string;
  selectedLng: string;

  loadingIcon: boolean = false;
  submitted: boolean = false;
  uploadImageFlag: boolean = false;
  addFormFlag: boolean = true;
  selectedLocationFlag: boolean = false;
  notificationsConfig: boolean = false;

  uploadFiles: any[];
  uploadProgresses: any[] = [];
  zone: NgZone;

  options: any;

  constructor(private _propertyService: PropertyService, private _http: Http, private _elementRef: ElementRef) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit() {
    this.getDepartments();
    this.getPropertyContract();
    this.getPropertyStatus();
    this.getPropertyType();
    this.getPropertyCoin();

    this.propertyData = new Property(1, this.userData.id, this.userData.office_id, '', 1, 1, 1, 1, 1, 1, 1, 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, null, '', null, 0, null, null, []);
    this.propertyData.report_date = this.calculateNewDate('0'); // set date now

    this.options = {
      url: this.PATH_SERVER + '&c=property&m=upload_image',
      params: { 'property_id': this.propertyData.id }
    };

    // console.log('Init PropertyAddComponent', this.propertyData);
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

  ngAfterViewInit() {

    let el = this._elementRef.nativeElement.querySelector('.google-maps');

    // TODO: do not load this each time as we already have the library after first attempt
    GoogleMapsLoader.load((google) => {
      let map = new google.maps.Map(el, {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      let myLatlng: any = {lat: 44.5403, lng: -78.5463};
      let latitude;
      let longitude;

      let infoWindow = new google.maps.InfoWindow({map: map});

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }


      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
      }


      let marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Click to zoom'
      });
      /*
       map.addListener('click', function (event) {
       latitude = event.latLng.lat();
       longitude = event.latLng.lng();

       let latlng = new google.maps.LatLng(latitude, longitude);
       marker.setPosition(latlng);

       $('#harold').val(latitude);


       });
       */

      google.maps.event.addListener(map, 'click', addMarkerMap.bind(this));

      function addMarkerMap(event) {

        latitude = event.latLng.lat();
        longitude = event.latLng.lng();

        let latlng = new google.maps.LatLng(latitude, longitude);
        marker.setPosition(latlng);
        this.selectedLat = latitude;
        this.selectedLng = longitude;
        this.selectedLocationFlag = true;
      }

      // Create the search box and link it to the UI element.
      let input = document.getElementById('pac-input');
      let searchBox = new google.maps.places.SearchBox(input);
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


  onCustomerSelected(customer) {
    this.selectedCustomer = customer;
    this.propertyData.customer_id = customer.id;
  }

  addProperty(addForm) {

    this.propertyData.property_type_id = this.selectedPropertyType.id;
    this.propertyData.property_status_id = this.selectedPropertyStatus.id;
    this.propertyData.property_contract_id = this.selectedPropertyContract.id;
    this.propertyData.department_id = this.selectedDepartment.id;
    this.propertyData.province_id = this.selectedProvince.id;
    this.propertyData.district_id = this.selectedDistrict.id;
    this.propertyData.property_coin_id = this.selectedPropertyCoin.id;
    this.propertyData.lat = this.selectedLat;
    this.propertyData.lng = this.selectedLng;
    this.submitted = true;

    let propertyId;

    // console.log(this.propertyData);

    if (addForm.valid && this.selectedLocationFlag) {

      this.propertyData.report_date = this.calculateNewDate(this.propertyData.report_days);
      this.loadingIcon = true;

      this._propertyService.addProperty(this.propertyData).subscribe(
        data => propertyId = (data),
        (error) => alert(error),
        () => {

          this.options.params.property_id = propertyId;
          this.propertyData.id = propertyId;
          this.loadingIcon = false;
          this.uploadImageFlag = true;
          this.addFormFlag = false;
        }
      );
    }
  }

  updateCommisionAmmount() {

    if (this.propertyData.price !== '' && this.propertyData.commission_percentage !== '') {

      this.propertyData.commission_amount = (parseFloat(this.propertyData.price) * (parseFloat(this.propertyData.commission_percentage) / 100)).toString();
    } else {
      this.propertyData.commission_amount = '';
    }
  }

  handleChangeNotifications(value) {

    this.propertyData.report_date = this.calculateNewDate('0');
    if (value) {
      this.notificationsConfig = true;
    } else {
      this.propertyData.report_days = null;
      this.notificationsConfig = false;
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

  handleUpload(data): void {
    let id = data.id;
    let index = this.findIndex(id);
    if (index === -1) {
      this.uploadProgresses.push({id: id, percent: 0});
    }
    if (this.uploadProgresses[index]) {
      this.zone.run(() => {
        this.uploadProgresses[index].percent = data.progress.percent;
      });
    }
  }

  findIndex(id: string): number {
    return this.uploadProgresses.findIndex(x => x.id === id);
  }

  saveProperty(addForm) {

  }

  getDepartments() {
    this._propertyService.getDepartments().subscribe(
      data => this.departments = (data),
      error => alert(error),
      () => {
        this.selectedDepartment = this.departments[0];
        this.onChangeDepartment(this.selectedDepartment);

      }
    );
  }

  getPropertyContract() {
    this._propertyService.getPropertyContract().subscribe(
      data => this.propertyContract = (data),
      error => alert(error),
      () => {
        this.selectedPropertyContract = this.propertyContract[0];
      }
    );
  }

  getPropertyStatus() {
    this._propertyService.getPropertyStatus().subscribe(
      data => this.propertyStatus = (data),
      error => alert(error),
      () => {
        this.selectedPropertyStatus = this.propertyStatus[0];
      }
    );
  }

  getPropertyType() {
    this._propertyService.getPropertyType().subscribe(
      data => this.propertyType = (data),
      error => alert(error),
      () => {
        this.selectedPropertyType = this.propertyType[0];
      }
    );
  }

  getPropertyCoin() {
    this._propertyService.getPropertyCoin().subscribe(
      data => this.propertyCoin = (data),
      error => alert(error),
      () => {
        this.selectedPropertyCoin = this.propertyCoin[0];
      }
    );
  }

  onChangeDepartment(department) {
    this._propertyService.getProvinceByDepartment(department.id).subscribe(
      data => this.provinces = (data),
      error => alert(error),
      () => {
        this.selectedProvince = this.provinces[0];
        this.onChangeProvince(this.selectedProvince);
      }
    );
  }

  onChangeProvince(province) {
    this._propertyService.getDistrictByProvince(province.id).subscribe(
      data => this.districts = (data),
      error => alert(error),
      () => {
        this.selectedDistrict = this.districts[0];
      }
    );
  }

};

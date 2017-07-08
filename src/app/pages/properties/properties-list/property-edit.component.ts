import {Component, ElementRef, NgZone, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      float: left;
      width: 300px;
      height: auto;
      position: relative;
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

  public uploadFile: any;
  public uploadProgress: number;
  public uploadResponse: Object;
  public zone: NgZone;
  public options: any;

  constructor(private _activeRoute: ActivatedRoute, private _propertyService: PropertyService, private _http: Http, private _elementRef: ElementRef) {
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

    this.propertyData = new Property(1, 1, '', 1, 1, 1, 1, 1, 1, 1, 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, null, '', []);

    this._propertyService.getPropertyInfoById(this.propertyId).subscribe(
      data => this.propertyData = data,
      (error) => alert(error),
      () => {
        this.loadedData = true;
        this.selectedCustomer.id = this.propertyData.customer_id;
        this.selectedCustomer.name = this.propertyData.customer_name;
        this.selectedCustomer.email = this.propertyData.customer_email;
      }
    );

    this.getDepartments();
    this.getPropertyContract();
    this.getPropertyStatus();
    this.getPropertyType();
    this.getPropertyCoin();

  }

  ngAfterViewInit() {

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

      let infoWindow = new google.maps.InfoWindow({map: map});

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });


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
      (error) => alert(error),
      () => {
        let index = this.propertyData.images.map(function(e) { return e.id; }).indexOf(imageId);
        this.propertyData.images.splice(index, 1);
        this.loadingIcon = false;
      }
    );
  }

  editProperty(addForm) {
    this.propertyData.property_type_id = this.selectedPropertyType.id;
    this.propertyData.property_status_id = this.selectedPropertyStatus.id;
    this.propertyData.property_contract_id = this.selectedPropertyContract.id;
    this.propertyData.department_id = this.selectedDepartment.id;
    this.propertyData.province_id = this.selectedProvince.id;
    this.propertyData.district_id = this.selectedDistrict.id;
    this.propertyData.property_coin_id = this.selectedPropertyCoin.id;
    this.submitted = true;
    console.log(this.propertyData);

    if (addForm.valid) {

      this.loadingIcon = true;
      this.edited = true;

      this._propertyService.editProperty(this.propertyData).subscribe(
        (error) => alert(error),
        () => {
          this.loadingIcon = false;
          setTimeout(function() {
            this.edited = false;
          }.bind(this), 3000);
        }
      );
    }
  }

}

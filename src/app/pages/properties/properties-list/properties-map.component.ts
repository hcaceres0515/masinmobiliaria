import {Component, ElementRef, NgZone, OnInit} from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';
import {PropertyService} from '../property.service';
import {CONFIG_ENV} from "../../../app.config";

@Component({
  selector: 'properties-map',
  templateUrl: '/properties-map.html'
})

export class PropertiesMapComponent implements  OnInit{

  public mymap;
  public mymarkers: any = [];

  PATH_SERVER = CONFIG_ENV._SERVER;

  constructor(private _elementRef: ElementRef, private _propertyService: PropertyService, public _ngZone: NgZone) {

    window['angularComponentRef'] = { component: this, zone: this._ngZone };
  }

  ngOnInit() {

  }

  // Sets the map on all markers in the array.
  setMapOnAll(map) {
    for (let i = 0; i < this.mymarkers.length; i++) {
      this.mymarkers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers() {
    this.setMapOnAll(null);
  }

  // Deletes all markers in the array by removing references to them.
  deleteMarkers() {
    this.clearMarkers();
    this.mymarkers = [];
  }

  showViewProperty(propertyId){
    this._propertyService.callShowViewModalService(propertyId);
  }

  ngAfterViewInit() {
    let el = this._elementRef.nativeElement.querySelector('.google-maps');

    // TODO: do not load this each time as we already have the library after first attempt
    GoogleMapsLoader.load((google) => {

      let markers = [];

      let map = new google.maps.Map(el, {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      this.mymap = map;

      let properties;

      let infoWindow = new google.maps.InfoWindow({map:  map});

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Esta es su ubicación');
          map.setCenter(pos);

        }, function() {
          handleLocationError(true, infoWindow,  map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow,  map.getCenter());
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
      }

      google.maps.event.addListener( map, 'click', getProperties.bind(this));

      function getProperties(event) {

        this.mymarkers = markers;

        let latitude = event.latLng.lat();
        let longitude = event.latLng.lng();

        this._propertyService.getPropertiesByLocation(latitude, longitude).subscribe(
          (data) => properties = data,
          (error) => alert(error),
          () => {
            this.deleteMarkers();
            console.log(properties);
            for (let i = 0; i < properties.length; i++) {
              addMarker(properties[i]);
            }
          }
        );
        // this._propertyService.callShowViewModalService(8);
      }

      function addMarker(feature) {

        let icon = 'https://www.masinmobiliaria.pe/resources/tools/marker_map.png';
        let position = new google.maps.LatLng(parseFloat(feature.lat), parseFloat(feature.lng));
        let marker = new google.maps.Marker({
          position: position,
          icon: icon,
          map:  map
        });

        let infowindow = new google.maps.InfoWindow();
        let content = '';

        google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow){
          return function() {
            infowindow.setContent('<h3>' + feature.title + '</h3><h5> Código: ' + feature.id + ' <br> Dirección: ' + feature.address + '</h5>' + '<button class="btn btn-success btn-xs" onclick="window.angularComponentRef.zone.run(() => {window.angularComponentRef.component.showViewProperty(\'' + feature.id + '\');})"> Detalles</button>');
            infowindow.open( map, marker);
          };
        })(marker, content, infowindow));

        // mouseover
        /* google.maps.event.addListener(marker, 'mouseout', function() {
          infowindow.close();
        });
        */
        markers.push(marker);
      }

      // https://developers.google.com/maps/documentation/javascript/custom-markers

    });
  }





}

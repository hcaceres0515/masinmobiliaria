import { Component, ElementRef, OnInit } from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';
import {PropertyService} from '../property.service';

@Component({
  selector: 'properties-map',
  templateUrl: '/properties-map.html'
})

export class PropertiesMapComponent implements  OnInit{

  constructor(private _elementRef: ElementRef, private _propertyService: PropertyService) {
  }

  ngOnInit() {

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

      let properties;

      let infoWindow = new google.maps.InfoWindow({map: map});

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

      google.maps.event.addListener(map, 'click', addMarkerMap.bind(this));

      function addMarkerMap(event) {

        let latitude = event.latLng.lat();
        let longitude = event.latLng.lng();
        console.log( latitude + ', ' + longitude );

        this._propertyService.getPropertiesByLocation(latitude, longitude).subscribe(
          (data) => properties = data,
          (error) => alert(error),
          () => {
            console.log(properties);
            for (let i = 0; i < properties.length; i++) {
              addMarker(properties[i]);
            }
          }
        );

      }

      let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
      let icons = {
        parking: {
          icon: iconBase + 'parking_lot_maps.png'
        },
        library: {
          icon: iconBase + 'library_maps.png'
        },
        info: {
          icon: iconBase + 'info-i_maps.png'
        }
      };

      let markers = [];

      function addMarker(feature) {

        let icon = 'http://www.villas-vacations.com/htpics/gmapicons/v2yel.png';
        let position = new google.maps.LatLng(parseFloat(feature.lat), parseFloat(feature.lng));
        let marker = new google.maps.Marker({
          position: position,
          icon: icon,
          map: map
        });

        let infowindow = new google.maps.InfoWindow();
        let content = '<h3>' + feature.title + '</h3>';

        google.maps.event.addListener(marker, 'mouseover', (function(marker, content, infowindow){
          return function() {
            infowindow.setContent('<h3>' + feature.title + '</h3><br><h5> Direccion: ' + feature.address + '</h5>');
            infowindow.open(map, marker);
          };
        })(marker, content, infowindow));

        marker.addListener('mouseout', function() {
          infowindow.close();
        });
      }



      /*
      for (let i = 0; i < features.length; i++) {
        addMarker(features[i]);
      }
      */
      // https://developers.google.com/maps/documentation/javascript/custom-markers

    });
  }
}

import { Component, ElementRef, OnInit } from '@angular/core';
import * as GoogleMapsLoader from 'google-maps';
import {PropertyService} from "../property.service";

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

          this._propertyService.getPropertiesByLocation(-16.3790035977, -71.5514445305).subscribe(
            (data) => properties = data,
            (error) => alert(error),
            () => {
              console.log(properties);
            }
          );

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

      function addMarker(feature) {
        let marker = new google.maps.Marker({
          position: feature.position,
          icon: icons[feature.type].icon,
          map: map
        });
      }

      let features = [
        {
          position: new google.maps.LatLng(-33.91721, 151.22630),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91539, 151.22820),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91747, 151.22912),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91910, 151.22907),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91725, 151.23011),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91872, 151.23089),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91784, 151.23094),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91682, 151.23149),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91790, 151.23463),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91666, 151.23468),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.916988, 151.233640),
          type: 'info'
        }, {
          position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
          type: 'parking'
        }, {
          position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
          type: 'library'
        }
      ];

      for (let i = 0; i < features.length; i++) {
        addMarker(features[i]);
      }

      // https://developers.google.com/maps/documentation/javascript/custom-markers

    });
  }
}

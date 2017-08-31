
import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { PropertyService } from '../property.service';
import { Property } from '../property';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import {CONFIG_ENV} from "../../../app.config";

@Component({
  selector: 'property-view',
  templateUrl: '/property-view.html'
})

export class PropertyViewComponent {

  @ViewChild('viewPropertyModal') viewPropertyModal: ModalDirective;

  PATH_SERVER = CONFIG_ENV._SERVER;
  propertyData: Property;

  public userData: any;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private _propertyService: PropertyService){

    this.propertyData = new Property(1, 1, null, '', 1, 1, 1, 1, 1, 1, 1, 1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, null, '', null, null, null, null, []);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    let propertyId;
    this._propertyService.componentMethodCalled$.subscribe(
      data => {
        propertyId = data;
        this.showViewModal(propertyId);
      }
    );

    this.galleryOptions = [
      {
        width: '850px',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  showViewModal(propertyId): void {
    this.viewPropertyModal.show();

    this._propertyService.getPropertyInfoById(propertyId).subscribe(
      data => this.propertyData = data,
      error => alert(error),
      () => {
        this.setFormatImages(this.propertyData);
      }
    );
  }

  hideViewModal(): void {
    this.viewPropertyModal.hide();
  }

  setFormatImages(property) {

    let images: any = [];
    let image: any = {};

    this.galleryImages = [];

    (this.propertyData.images).forEach((item) => {
      image = {
        small: item.src,
        medium: item.src,
        big: item.src
      };
      this.galleryImages.push(image);
    });
  }

  downloadImages(propertyId) {

    window.open(this.PATH_SERVER  + '&c=property&m=download_property_images&property_id=' + propertyId);

  }

  downloadPdf(propertyId) {

    window.open(this.PATH_SERVER  + '&c=property&m=download_property_pdf&property_id=' + propertyId + '&user_id=' + this.userData.id);
  }
}

import {Component, OnInit} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { CONFIG_ENV } from '../../../app.config';
import {SliderService} from './slider.service';

@Component({
  selector: 'slider-frontpage',
  templateUrl: './slider-frontPage.html'
})


export class SliderComponent implements OnInit {

  public PATH_SERVER = CONFIG_ENV._SERVER;

  public isProperty: boolean = false;
  public showEditSliderBox: boolean = false;

  public sliderData: any = [];

  public sliderSelected: any = {id: null, property_id: null, title: '', message: '', img_src: '', button_link: '', priority: 0, status: 1};

  public options: Object;

  public defaultPicture = 'assets/img/theme/no-photo.png';

  public profile: any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };

  public uploaderOptions: NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: this.PATH_SERVER + '&c=theme&m=upload_image_slider',
    data: {
      slider_id: 3
    }
  };

  constructor(private _sliderService: SliderService){

  }

  ngOnInit() {

    this.getSliderMain();
  }

  getSliderMain() {

    this._sliderService.getSliderMain().subscribe(
      (data) => { this.sliderData = data; },
      (error) => {},
      () => {
        // console.log(this.sliderData);
      }
    );

  }

  selectEditSlider(data) {
    this.sliderSelected = JSON.parse(JSON.stringify(data));
    this.showEditSliderBox = true;
    this.uploaderOptions.data.slider_id = this.sliderSelected.id;
    console.log(data);

    if (this.sliderSelected.property_id == null) {
      this.isProperty = false;
    } else {
      this.isProperty = true;
    }
  }

  editSlider() {
    if (this.isProperty) {
      this.sliderSelected.title = '';
      this.sliderSelected.message = '';
      this.sliderSelected.button_link = '';
    } else {
      this.sliderSelected.property_id = null;
    }

    this._sliderService.editSliderMain(this.sliderSelected).subscribe(
      (error) => {},
      () => {
        this.showEditSliderBox = false;
        this.getSliderMain();
      }
    );
  }

  changeIsPropperty() {
    console.log(this.isProperty);
  }

  uploadCompleted(data) {
    let obj = JSON.parse(data.response);
    this.sliderSelected.img_src = obj.slider_img_src;
    // console.log(obj);
    // console.log('uploaded complete', data);
  }
}

import { Injectable } from '@angular/core';
import { CONFIG_ENV } from '../../../app.config';
import { Http, RequestOptions, Headers } from '@angular/http';
@Injectable()

export  class SliderService {

  PATH_SERVER = CONFIG_ENV._SERVER;

  public headers: Headers;
  public options: RequestOptions;

  constructor(private _http: Http) {

    this.headers = new Headers({ 'Content-Type': 'multipart/form-data' , 'Accept': 'application/json'});
    this.options = new RequestOptions({ headers: this.headers, method: 'post' });

  }

  getSliderMain() {
    return this._http.get(this.PATH_SERVER + '&c=theme&m=get_all_slider_main')
      .map(res => res.json());
  }

  editSliderMain(data) {
    let sliderData = JSON.stringify(data);
    return this._http.post(this.PATH_SERVER + '&c=theme&m=edit_slider_main', sliderData, this.options)
      .map(res => res.json());
  }
}

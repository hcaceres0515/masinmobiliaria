import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { CONFIG_ENV } from '../../app.config';

@Injectable()
export class LoginService {

  public isLogged = false;
  userData: any;

  PATH_SERVER = CONFIG_ENV._SERVER;

  constructor (private _http: Http, private _router: Router) {

  }


  login(email, password) {
    return this._http.get(this.PATH_SERVER + '&c=user&m=login&email=' + email + '&password=' + password)
      .map(res => res.json());
  }


}

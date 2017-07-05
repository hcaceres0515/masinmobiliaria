import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {CONFIG_ENV} from "../app.config";

@Injectable()
export class AuthService {

  PATH_SERVER = CONFIG_ENV._SERVER;

  userData: any;

  constructor(private _http: Http, private _router: Router) {

  }

  isLoggedIn(): boolean {

    if (localStorage.getItem('userData') === null) {
      return false;
    } else {
      return true;
    }
  }

  logout(): void {
    localStorage.removeItem('userData');
    this._router.navigate(['/login']);
  }

  getUserData() {

    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    return userData;

  }

  setUserData(userId) {
    let user;
    this._http.get(this.PATH_SERVER + '&c=user&m=get_user_by_id&user_id=' + userId).subscribe(
      data => user = (data),
      error => alert(error),
      () => {
        localStorage.setItem('userData', JSON.stringify(user));
      }
    );
  }

}

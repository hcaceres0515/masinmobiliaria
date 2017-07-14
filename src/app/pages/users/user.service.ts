import { Http, RequestOptions, Headers } from '@angular/http';
import { CONFIG_ENV } from '../../app.config';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class UserService {

  PATH_SERVER = CONFIG_ENV._SERVER;

  // Observable string sources
  public componentMethodCallSource = new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  constructor(private _http: Http) {}

  // Service message commands
  callUpdateTableService() {
    this.componentMethodCallSource.next();
  }

  getUsersByOffice(officeId) {
    return this._http.get(this.PATH_SERVER + '&c=user&m=get_users_by_office&office_id=' + officeId)
      .map(res => res.json());
  }

  getAllUsers() {
    return this._http.get(this.PATH_SERVER + '&c=user&m=get_all_users')
      .map(res => res.json());
  }

  addUser(user) {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let userData = JSON.stringify(user);
    // console.log(userData);
    return this._http.post(this.PATH_SERVER + '&c=user&m=add_user', userData, options)
      .map(res => res.json());
  }

  editUser(user) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let userData = JSON.stringify(user);
    return this._http.post(this.PATH_SERVER + '&c=user&m=edit_user', userData, options)
      .map(res => res.json());
  }


  deleteUser(userId) {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let userData = JSON.stringify({user_id: userId});
    return this._http.post(this.PATH_SERVER + '&c=user&m=delete_user', userData, options)
      .map(res => res.json());
  }

  sendPasswordToUSer(userId) {
    return this._http.get(this.PATH_SERVER + '&c=user&m=send_new_password&user_id=' + userId)
      .map(res => res.json());
  }

  uploadImage(formData) {
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' , 'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers, method: 'post' });
    return this._http.post(this.PATH_SERVER + '&c=user&m=upload_image', formData, options)
      .map(res => res.json());
  }
}

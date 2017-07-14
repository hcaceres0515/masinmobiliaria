import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CONFIG_ENV } from '../../app.config';
import {Subject} from "rxjs";

@Injectable()

export class CustomerService {

  PATH_SERVER = CONFIG_ENV._SERVER;

  // Observable string sources
  public componentMethodCallSource = new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  constructor (private _http: Http, private _router: Router) {
    console.log('Init customer service');
  }

  // Service message commands
  callUpdateTableService() {
    this.componentMethodCallSource.next();
  }

  getCustomersByUser(userId) {
    return this._http.get(this.PATH_SERVER + '&c=customer&m=get_customers_by_user&user_id=' + userId)
      .map(res => res.json());
  }

  getCustomersByOffice(officeId) {
    return this._http.get(this.PATH_SERVER + '&c=customer&m=get_customers_by_office&office_id=' + officeId)
      .map(res => res.json());
  }

  addCustomer(customer) {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let customerData = JSON.stringify(customer);
    return this._http.post(this.PATH_SERVER + '&c=customer&m=add_customer', customerData, options)
      .map(res => res.json());
  }

  editCustomer(customer) {

    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let customerData = JSON.stringify(customer);
    return this._http.post(this.PATH_SERVER + '&c=customer&m=edit_customer', customerData, options)
      .map(res => res.json());
  }

  deleteCustomerById(customerId) {
    return this._http.get(this.PATH_SERVER + '&c=customer&m=delete_customer_by_id&customer_id=' + customerId)
      .map(res => res.json());
  }

  getCustomerTypes() {

    let obj = [
      {
        id: '1',
        name: 'Vendedor'
      },
      {
        id: '2',
        name: 'Comprador'
      }
    ];

    return obj;
  }

  searchCustomerByKeyword(keyword) {
    return this._http.get(this.PATH_SERVER + '&c=customer&m=get_customer_by_keyword&keyword=' + keyword)
      .map(res => res.json());
  }
}

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CONFIG_ENV } from '../../app.config';

@Injectable()
export  class PropertyService {

  PATH_SERVER = CONFIG_ENV._SERVER;

  constructor(private _http: Http) {}

  getPropertiesByUser(userId) {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_properties_by_user&user_id=' + userId)
      .map(res => res.json());
  }

  getProperties() {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_properties')
      .map(res => res.json());
  }

  getPropertiesByOffice(officeId) {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_properties_by_office&office_id=' + officeId)
      .map(res => res.json());
  }

  getPropertyInfoById(propertyId) {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_property_by_id&property_id=' + propertyId)
      .map(res => res.json());
  }

  getPropertiesByLocation(lat, lng) {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_properties_by_location&lat=' + lat + '&lng=' + lng)
      .map(res => res.json());
  }

  getDepartments() {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_departments')
      .map(res => res.json());
  }

  getProvinceByDepartment(depaId) {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_provinces_by_department&department_id=' + depaId)
      .map(res => res.json());
  }

  getDistrictByProvince(proId) {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_districts_by_province&province_id=' + proId)
      .map(res => res.json());
  }

  getPropertyContract() {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_property_contract').map(res => res.json());
  }

  getPropertyStatus() {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_property_status').map(res => res.json());
  }

  getPropertyType() {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_property_type').map(res => res.json());
  }

  getPropertyCoin() {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_property_coin').map(res => res.json());
  }

  getPropertyVisits(propertyId, dateFrom, dateTo) {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_property_visits&propertyId' + propertyId + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo).map(res => res.json());
  }

  addProperty(property) {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let propertyData = JSON.stringify(property);
    return this._http.post(this.PATH_SERVER + '&c=property&m=add_property', propertyData, options)
      .map(res => res.json());
  }

  editProperty(property) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let propertyData = JSON.stringify(property);
    return this._http.post(this.PATH_SERVER + '&c=property&m=edit_property', propertyData, options)
      .map(res => res.json());
  }

  deleteProperty(property) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let propertyData = JSON.stringify(property);
    return this._http.post(this.PATH_SERVER + '&c=property&m=delete_property', propertyData, options)
      .map(res => res.json());
  }

  deletePropertyImage(imageId) {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let propertyData = JSON.stringify({image_id: imageId});
    return this._http.post(this.PATH_SERVER + '&c=property&m=delete_property_image', propertyData, options)
      .map(res => res.json());
  }

  sendPropertyByEmail(propertyId, customerId, userId, message) {
    return this._http.get(this.PATH_SERVER + '&c=property&m=send_property_pdf_by_email&property_id=' + propertyId + '&customer_id=' + customerId + '&user_id=' + userId + '&message=' + message)
      .map(res => res.json());
  }

};

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CONFIG_ENV } from '../../app.config';
import {Subject} from "rxjs";

@Injectable()
export  class PropertyService {

  PATH_SERVER = CONFIG_ENV._SERVER;

  // Observable string sources
  public componentMethodCallSource = new Subject<any>();
  public componentMethodCallSourcePropertyVisit = new Subject<any>();
  public componentMethodCallSourceProperty = new Subject<any>();
  public methodCallSourcePropertyVisitEdit = new Subject<any>();
  public methodCallSourcePropertyModalConfirm = new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  componentMethodCallPropertyVisit$ = this.componentMethodCallSourcePropertyVisit.asObservable();
  componentMethodCallProperty$ = this.componentMethodCallSourceProperty.asObservable();
  methodCallPropertyVisitEdit$ = this.methodCallSourcePropertyVisitEdit.asObservable();
  methodCallPropertyModalConfirm$ = this.methodCallSourcePropertyModalConfirm.asObservable();

  public propertyStatus = [
    {id: 1, name: 'Cerrar Propiedad'},
    {id: 2, name: 'Cierre Pendiente'},
    {id: 3, name: 'Propiedad Cerrada'}
  ];

  constructor(private _http: Http) {}

  // Service message commands
  callShowConfirmModalService() {
    this.methodCallSourcePropertyModalConfirm.next();
  }

  // Service message commands
  callShowViewModalService(propertyId) {
    this.componentMethodCallSource.next(propertyId);
  }

  // Service message commands
  callShowDeleteModalPropertyVisit(visitId) {
    this.componentMethodCallSource.next(visitId);
  }

  callShowEditPropertyVisit(visitId) {
    this.methodCallSourcePropertyVisitEdit.next(visitId);
  }

  callReloadListPropertyVisit(){
    this.componentMethodCallSourcePropertyVisit.next();
  }

  callReloadListProperty(){
    this.componentMethodCallSourceProperty.next();
  }

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

  getPropertyVisits(userId, propertyId, dateFrom, dateTo) {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_property_visits&userId=' + userId + '&propertyId=' + propertyId + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo).map(res => res.json());
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

  deleteProperty(propertyId) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let propertyData = JSON.stringify({property_id: propertyId});
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

  addPropertyVisit(visit) {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let propertyData = JSON.stringify(visit);
    return this._http.post(this.PATH_SERVER + '&c=property&m=add_property_visit', propertyData, options)
      .map(res => res.json());
  }

  getPropertyVisit(propertyVisit) {
    return this._http.get(this.PATH_SERVER + '&c=property&m=get_property_visit&visit_id=' + propertyVisit)
      .map(res => res.json());
  }

  editPropertyVisit(propertyVisit) {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let propertyVisitData = JSON.stringify(propertyVisit);
    console.log(propertyVisitData);
    return this._http.post(this.PATH_SERVER + '&c=property&m=edit_property_visit', propertyVisitData, options)
      .map(res => res.json());
  }

  deletePropertyVisit(propertyVisitId) {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let propertyVisitData = JSON.stringify({property_visit_id: propertyVisitId});
    console.log(propertyVisitData);
    return this._http.post(this.PATH_SERVER + '&c=property&m=delete_property_visit', propertyVisitData, options)
      .map(res => res.json());
  }

  downloadPropertyImages(propertyId) {
    return this._http.get(this.PATH_SERVER + '&c=property&m=download_property_images&property_id=' + propertyId)
      .map(res => res.json());
  }

  transferProperties(userFrom, userTo) {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let propertyTransferData = JSON.stringify({user_from_id: userFrom, user_to_id: userTo});
    return this._http.post(this.PATH_SERVER + '&c=property&m=transfer_properties', propertyTransferData, options)
      .map(res => res.json());
  }

  changeStatusProperty(propertyId, statusId, officeId, userId) {

    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let propertyData = JSON.stringify({property_id: propertyId, office_id: officeId, user_id: userId, status: statusId});
    return this._http.post(this.PATH_SERVER + '&c=property&m=change_property_status', propertyData, options)
      .map(res => res.json());
  }

};

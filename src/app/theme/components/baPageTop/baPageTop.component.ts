import { Component, OnInit, ViewChild } from '@angular/core';

import { GlobalState } from '../../../global.state';

import 'style-loader!./baPageTop.scss';
import { AuthService } from '../../../pages/auth-service';
import { ModalDirective } from 'ng2-bootstrap';
import { CONFIG_ENV } from '../../../app.config';
import { UserService } from '../../../pages/users/user.service';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})
export class BaPageTop implements OnInit{

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public userData: any;
  public officeData: any = { id: null, name: '', address: '', phone: '', email: '', manager_name: '', manager_email: '', manager_phone: '' };

  options: Object;

  loadingIcon: boolean = false; // For show loading icon
  selectChangePassword: boolean = false;
  actionPermission: boolean = false;

  PATH_SERVER = CONFIG_ENV._SERVER;

  @ViewChild('userEditModal') userEditModal: ModalDirective;
  @ViewChild('officeEditModal') officeEditModal: ModalDirective;

  constructor(private _state: GlobalState, private _authService: AuthService, private _userService: UserService, private _http: Http) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.userData = this._authService.getUserData();
    this.userData.newPassword = '';
    // console.log(this.userData);
    if (this.userData.rol_name === 'admin') {
      this.actionPermission = true;
    }
  }

  ngOnInit() {
    this.options = {
      url: this.PATH_SERVER + '&c=user&m=upload_image',
      params: { 'user_id': this.userData.id }
    };
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  showUserEditModal(): void {
    this.userEditModal.show();
  }

  hideUserEditModal(): void {
    this.userEditModal.hide();
  }

  showOfficeEditModal(): void {
    this.getOfficeInfo();
    this.officeEditModal.show();
  }

  hideOfficeEditModal(): void {
    this.officeEditModal.hide();
  }

  handleUpload(data): void {
    this.loadingIcon = true;
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.loadingIcon = false;
      this.userData.path_user_photo = data.path_user_photo;
      this.userData.path_user_icon = data.path_user_icon;

      localStorage.setItem('userData', JSON.stringify(this.userData));
    }
  }

  onEditUser(user) {
    this.loadingIcon = true;
    this._userService.editUser(user).subscribe(
      error => alert(error),
      () => {
        this._authService.setUserData(user.id);
        this.loadingIcon = false;
        this.hideUserEditModal();
      }
    );
  }

  getOfficeInfo() {
    let office;
    this._http.get(this.PATH_SERVER + '&c=user&m=get_office_info&office_id=' + this.userData.office_id)
      .map(res => res.json())
      .subscribe(
        (data) => office = data,
        (error) => alert(error),
        () => {
          this.officeData = office;
        }
    );
  }

  onEditOffice(office) {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let officeData = JSON.stringify(office);
    this._http.post(this.PATH_SERVER + '&c=user&m=edit_office_info', officeData, options)
      .map(res => res.json())
      .subscribe(
        (error) => alert(error),
        () => {
          this.hideOfficeEditModal();
        }
      );
  }

  logout() {
    this._authService.logout();
  }
}

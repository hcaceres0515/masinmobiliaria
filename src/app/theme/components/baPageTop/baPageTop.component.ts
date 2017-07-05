import { Component, OnInit, ViewChild } from '@angular/core';

import { GlobalState } from '../../../global.state';

import 'style-loader!./baPageTop.scss';
import { AuthService } from '../../../pages/auth-service';
import { ModalDirective } from 'ng2-bootstrap';
import { CONFIG_ENV } from '../../../app.config';
import { UserService } from '../../../pages/users/user.service';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})
export class BaPageTop implements OnInit{

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public userData: any;

  options: Object;

  loadingIcon: boolean = false; // For show loading icon
  selectChangePassword: boolean = false;

  PATH_SERVER = CONFIG_ENV._SERVER;

  @ViewChild('userEditModal') userEditModal: ModalDirective;

  constructor(private _state: GlobalState, private _authService: AuthService, private _userService: UserService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.userData = this._authService.getUserData();
    this.userData.newPassword = '';
    console.log(this.userData);
    // this.userData.src_user_icon = 'http://localhost/masinmobiliaria/resources_dev/users/1/' + this.userData.profile_icon;
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

  logout() {
    this._authService.logout();
  }
}

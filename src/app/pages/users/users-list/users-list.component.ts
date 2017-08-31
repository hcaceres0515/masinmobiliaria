import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { CONFIG_ENV } from '../../../app.config';
import { PropertyService } from '../../properties/property.service';

@Component({
  selector: 'actions-user-table',
  templateUrl: './actions-user.html'
})

export class ActionsUsersTableComponent implements ViewCell, OnInit {

  @ViewChild('userEditModal') userEditModal: ModalDirective;
  @ViewChild('userViewModal') userViewModal: ModalDirective;
  @ViewChild('userDeleteModal') userDeleteModal: ModalDirective;

  @Input() value: any;
  @Input() rowData: any;

  PATH_SERVER = CONFIG_ENV._SERVER;

  userData: User;
  users: any[];
  selectedUser: any;

  public showtransferMessage: boolean = false;

  options: Object;

  loadingIcon: boolean = false; // For show loading icon

  constructor(private _userService: UserService, private _propertyService: PropertyService, private _router: Router) {

  }

  ngOnInit() {
    this.userData = this.value;

    this.options = {
      url: this.PATH_SERVER + '&c=user&m=upload_image',
      params: { 'user_id': this.userData.id }
    };


  }

  showUserEditModal(): void {
    this.userEditModal.show();
  }

  hideUserEditModal(): void {
    this.userEditModal.hide();
  }

  showUserViewModal(): void {
    this.userViewModal.show();
  }

  hideUserViewModal(): void {
    this.userViewModal.hide();
  }

  showUserDeleteModal(): void {
    this.userDeleteModal.show();
    this.getAllUsers(); //Cargar todos los agentes
  }

  hideUserDeleteModal(): void {
    this.userDeleteModal.hide();
  }

  onEditUser(user) {
    this.loadingIcon = true;
    this._userService.editUser(user).subscribe(
      error => alert(error),
      () => {
        this.loadingIcon = false;
        this.hideUserEditModal();
        this._userService.callUpdateTableService();
      }
    );
  }

  onDeleteUser(userId) {
    this._userService.deleteUser(userId).subscribe(
      error => alert(error),
      () => {
        this.hideUserDeleteModal();
        this._userService.callUpdateTableService();
      }
    );
  }

  onSendPasswordToUser(userId) {
    this.loadingIcon = true;
    this._userService.sendPasswordToUSer(userId).subscribe(
      error => alert(error),
      () => {
        this.loadingIcon = false;
        console.log(this.userData);
      }
    );
  }

  onFileChange(event) {

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      console.log(file.name);
      let res;
      this._userService.uploadImage(formData).subscribe(
        data => res = (data),
        error => (error),
        () => {
        }
      );
    }
  }

  handleUpload(data): void {
    this.loadingIcon = true;
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.loadingIcon = false;
      this.userData.path_user_photo = data.path_user_photo;
    }
  }

  getAllUsers() {
    this._userService.getAllUsers().subscribe(
      (data) => this.users = data,
      (error) => alert(error),
      () => {
        let userFilter = this.users.filter( user => user.id !== this.userData.id);
        this.users = userFilter;
        this.selectedUser = this.users[0];
      }
    );
  }

  transferProperties(userId) {
    let userToId = this.selectedUser.id;
    console.log(this.selectedUser);
    console.log(userId);

    this._propertyService.transferProperties(userId, userToId).subscribe(
      error => {},
      () => {
        this.showtransferMessage = true;

        setTimeout(function() {
          this.showtransferMessage = false;
        }.bind(this), 3000);
      }
    );
  }
}

@Component({
  selector: 'users-list',
  templateUrl: './users-list.html',
  styles: ['.alert-danger { padding: 5px 10px; margin-top: 5px; font-size: 10px}']
})

export class UsersListComponent implements OnInit{

  @ViewChild('userAddModal') userAddModal: ModalDirective;

  query: string = '';

  settings = {
    noDataMessage: 'No se encontraron registros.',
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false
      },
      name: {
        title: 'Nombre',
        type: 'string',
        filter: false
      },
      email: {
        title: 'E-mail',
        type: 'string',
        filter: false
      },
      phone: {
        title: 'Telefono',
        type: 'string',
        filter: false
      },
      createdAt: {
        title: 'Creado',
        type: 'date',
        filter: false
      },
      item: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ActionsUsersTableComponent,
        filter: false
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  userLoggedData: any; // For loggin
  users: any;

  userData: User;

  loadingIcon: boolean = false; // For show loading icon

  constructor(private _userService: UserService, private _router: Router) {

    this._userService.componentMethodCalled$.subscribe(
      () => {
        this.loadTable();
      }
    );

  }

  ngOnInit() {

    this.userLoggedData = JSON.parse(localStorage.getItem('userData'));

    this.userData = new User(1, this.userLoggedData.office_id, 2, '',  '',  '', '', '', '', '');

    this.loadTable();
  }

  loadTable() {

    this._userService.getUsersByOffice(this.userLoggedData.office_id).subscribe(
      data => this.users = (data),
      error => alert(error),
      () => {

        // console.log(this.users);
        (this.users).forEach((value) => {
          value.item = new User(value.id, 1, 1, value.name, value.email, value.phone, value.path_user_photo, '', value.createdAt, value.path_user_photo);
        })

        this.source.load(this.users);
      }
    );

  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'name',
        search: query
      },
      {
        field: 'email',
        search: query
      }
    ], false);
  }

  onAddUser(userData) {

    this.loadingIcon = true;

    this._userService.addUser(userData).subscribe(
      error => alert(error),
      () => {
        this.loadTable();
        this.loadingIcon = false;
        this.hideUserAddModal();
      }
    );
  }

  showUserAddModal(): void {
    this.userAddModal.show();
  }

  hideUserAddModal(): void {
    this.userData.name = '';
    this.userData.email = '';
    this.userData.phone = '';
    this.userAddModal.hide();
  }
}

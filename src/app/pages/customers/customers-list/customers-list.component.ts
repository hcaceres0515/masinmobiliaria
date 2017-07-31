import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { SmartTablesService } from '../../tables/components/smartTables/smartTables.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { Customer, CustomerType } from '../customers';

@Component({
  selector: 'actions-table',
  templateUrl: './actions-list.html',
  styles: ['.alert-danger { padding: 5px 10px; margin-top: 5px; font-size: 10px} ']
})
export class ActionsTableComponent implements OnInit {

  @ViewChild('editModal') editModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('viewModal') viewModal: ModalDirective;

  @Input() value: any;
  @Input() rowData: any;

  customerData: Customer;
  customerSelected: Customer; //Para guardar la copia
  customerTypes: any[];
  userData: any;

  showPermissionFlag: boolean = false;

  constructor(private _router: Router, private _customerService: CustomerService) {}

  ngOnInit() {
    // console.log(this.value.item);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.customerTypes = this._customerService.getCustomerTypes();
    this.customerData = this.value;

    if (this.value.user_id === this.userData.id || this.userData.rol_name === 'admin') {
      this.showPermissionFlag = true;
    }
  }

  deleteUser() {
    this._customerService.callUpdateTableService();
  }


  showEditModal(): void {

    this.customerSelected = Object.assign({}, this.customerData);
    // console.log(this.customerData);
    this.editModal.show();
  }

  hideEditModal(): void {
    this.customerData = this.customerSelected;
    this.editModal.hide();
  }

  showViewModal(): void {
    this.viewModal.show();
  }

  hideViewModal(): void {
    this.viewModal.hide();
  }

  showDeleteModal(): void {
    this.deleteModal.show();
  }

  hideDeleteModal(): void {
    this.deleteModal.hide();
  }

  onEditCustomer(customerData) {
    let postData;
    this._customerService.editCustomer(customerData).subscribe(
      error => alert(error),
      () => {
        this.editModal.hide();
        this._customerService.callUpdateTableService();
      },
    );
  }

  onDeleteCustomer(customerId) {
    this._customerService.deleteCustomerById(customerId).subscribe(
      error => alert(error),
      () => {
        this.deleteModal.hide();
        this._customerService.callUpdateTableService();
      }
    );
  }

}

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.html',
  styles: ['.alert-danger { padding: 5px 10px; margin-top: 5px; font-size: 10px} ']
})

export class CustomersListComponent implements OnInit {

  @ViewChild('addModal') addModal: ModalDirective;

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
      type_name: {
        title: 'Tipo',
        type: 'string',
        filter: {
          type: 'list',
          config: {
            selectText: 'Todos',
            list: [
              { value: 'Vendedor', title: 'Vendedor' },
              { value: 'Comprador', title: 'Comprador' }
            ],
          },
        },
      },
      createdAt: {
        title: 'Creado',
        type: 'date',
        filter: false
      },
      item: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ActionsTableComponent,
        filter: false
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  customers: any[];
  userData: any;
  newCustomerData: Customer;
  customerTypes: any[];

  showPermissionFlag: boolean = false;

  constructor(protected service: SmartTablesService, private _customerService: CustomerService, private _router: Router) {

    this._customerService.componentMethodCalled$.subscribe(
      () => {
        this.getCustomersData();
      }
    );

  }

  ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.newCustomerData = new Customer(1, this.userData.id, this.userData.office_id, '', '', '', '', '', '', new CustomerType(1, ''));

    this.customerTypes = this._customerService.getCustomerTypes();
    this.newCustomerData.customerType = this.customerTypes[0];

    if (this.userData.rol_name === 'admin') {
      this.showPermissionFlag = true;
    }

    this.getCustomersData();
  }

  updateList() {
    alert('update List');
  }

  getCustomersData() {
    this._customerService.getCustomersByUser(this.userData.id).subscribe(
      data => this.customers = (data),
      error => alert(error),
      () => {

        this.customers = this.sourceLoadTable(this.customers);
        this.source.load(this.customers);
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
    ], true);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }


  showAddModal(): void {
    // this.customerData = item;
    this.addModal.show();
  }

  hideAddModal(): void {
    this.addModal.hide();
  }

  onChangeUserFilter(opt) {
    if (opt === '1') {
        this._customerService.getCustomersByUser(this.userData.id).subscribe(
          data => this.customers = (data),
          error => alert(error),
          () => {
            this.source.load(this.sourceLoadTable(this.customers));
          }
        );
    } else {
        this._customerService.getCustomersByOffice(this.userData.office_id).subscribe(
          data => this.customers = (data),
          error => alert(error),
          () => {
            this.source.load(this.sourceLoadTable(this.customers));
          }
        );
    }
  }

  onAddCustomer(customerData) {

    let postData;
    this._customerService.addCustomer(customerData).subscribe(
      error => alert(error),
      () => {
        this.addModal.hide();
        this.getCustomersData();
        // location.reload();
      },
    );
  }
  onUserRowSelect(event): void {
    // alert('hello');
    // console.log(event.data);
    // this.customerSelected = event.data;

  }

  // Utilities Function

  sourceLoadTable(data) {

    Object(data).forEach((value) => {

      let customerType: CustomerType;

      if (value.customer_type === '1') {
        value.type_name = 'Vendedor';
        customerType = new CustomerType(value.customer_type, 'Vendedor');
      } else {
        value.type_name = 'Comprador';
        customerType = new CustomerType(value.customer_type, 'Comprador');
      }

      value.item = new Customer(value.id, value.user_id, value.office_id, value.name, value.email, value.first_phone, value.second_phone, value.address, value.createdAt, customerType);
    });

    return data;
  }


}

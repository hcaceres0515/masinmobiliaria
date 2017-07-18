
import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {PropertyService} from "../property.service";

@Component({
  selector: 'porperty-visit',
  templateUrl: 'property-visit.html'
})

export class PropertyVisitComponent implements  OnInit{

  settings = {
    noDataMessage: 'No se encontraron registros.',
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'Codigo',
        type: 'number',
        filter: false
      },
      name: {
        title: 'Titulo',
        type: 'string',
        filter: false
      },
      email: {
        title: 'Nombre del cliente',
        type: 'string',
        filter: false
      },
      phone: {
        title: 'Fecha',
        type: 'string',
        filter: false
      },
      createdAt: {
        title: 'Comentario',
        type: 'string',
        filter: false
      },
      item: {
        title: 'Acciones',
        type: 'custom',
        filter: false
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  public properties: any[] = [];

  constructor(private _propertyService: PropertyService) {}

  ngOnInit() {

    let today: Date;

    today = new Date();
    let date = this.formatDate(today);
    console.log(date);
    /*
    this._propertyService.getPropertyVisits().subscribe(
      data => this.properties = data,
      error => alert(error),
      () => {

      }
    );
    */
  }

  formatDate(date) {

    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}

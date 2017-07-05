import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
})
export class CustomerComponent implements OnInit{

  constructor(private _router: Router) {
  }

  ngOnInit() {

  }
}

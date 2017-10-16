import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created by Harold Caceres </div>
      
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  public MENU_ROUTES: any[];

  constructor(private _menuService: BaMenuService, private _router: Router) {
  }

  ngOnInit() {

    this._menuService.getRolMenu().subscribe(
      data => this.MENU_ROUTES = (data),
      error => alert(error),
      () => {

        const ROL_MENU: any = [{ path: 'pages', children: [] }];

        ROL_MENU[0].children.push( {
          path: 'dashboard',
          data: {
            menu: {
              title: 'Dashboard',
              icon: 'ion-android-home',
              selected: false,
              expanded: false,
              order: 0
            }
          }
        });

        Object.keys(this.MENU_ROUTES).forEach((value) => {

          if ('children' in this.MENU_ROUTES[value]) {

            const CHILD_MENU = [];

            Object(this.MENU_ROUTES[value].children).forEach((child) => {
              CHILD_MENU.push({
                path: child.path,
                data: {
                  menu: {
                    title: child.title
                  }
                }
              });
            });

            ROL_MENU[0].children.push({
              path: this.MENU_ROUTES[value].path,
              data: {
                menu: {
                  title: this.MENU_ROUTES[value].title,
                  icon: this.MENU_ROUTES[value].icon,
                  selected: false,
                  expanded: false,
                  order: 0
                }
              },
              children: CHILD_MENU
            });
          } else {
            ROL_MENU[0].children.push({
              path: this.MENU_ROUTES[value].path,
              data: {
                menu: {
                  title: this.MENU_ROUTES[value].title,
                  icon: this.MENU_ROUTES[value].icon,
                  selected: false,
                  expanded: false,
                  order: 0
                }
              }
            });
          }
        });

        /*ROL_MENU.push({
          path: '',
            data: {
          menu: {
            title: 'Paginas',
              icon: 'ion-document-text',
              selected: false,
              expanded: false,
              order: 650,
          }
        },
          children: [
            {
              path: ['/login2'],
              data: {
                menu: {
                  title: 'Login'
                }
              }
            }
          ]
        });*/
        // console.log(ROL_MENU);
        // console.log(PAGES_MENU);
        this._menuService.updateMenuByRoutes(<Routes>ROL_MENU);
      });

  }
}

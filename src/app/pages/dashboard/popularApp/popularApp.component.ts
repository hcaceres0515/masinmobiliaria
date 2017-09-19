import {Component} from '@angular/core';
import 'style-loader!./popularApp.scss';
import {AuthService} from "../../auth-service";

@Component({
  selector: 'popular-app',
  templateUrl: './popularApp.html'
})
export class PopularApp {

  public userData: any;

  constructor(private _authService: AuthService) {

    this.userData = this._authService.getUserData();

  }

  ngOnInit() {
  }
}

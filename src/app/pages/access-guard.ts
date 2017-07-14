import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { Injectable } from '@angular/core';

@Injectable()
export class AccessGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

    // const roles = route.data['userRole'] as Array<string>;
    const roles = route.children[0].data['userRole'] as Array<string>;

    if (!this._authService.isLoggedIn()) {

      this._router.navigate(['/login']);

    } else {

      let userData: any = this._authService.getUserData();
      let userRole = userData.rol_name;

      if (roles == null) { // If it doesn't data attribute
        return true;
      }

      if (roles.indexOf(userRole) === -1) {
        console.log('You can not access to this page ' + userRole);
        this._router.navigate(['/pages/dashboard']);
      }
    }
    return true;
  }
}

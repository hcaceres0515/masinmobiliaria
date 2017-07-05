import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { Injectable } from '@angular/core';

@Injectable()
export class AccessGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

    if (!this._authService.isLoggedIn()) {
      this._router.navigate(['/login']);
    }
    return true;
  }
}

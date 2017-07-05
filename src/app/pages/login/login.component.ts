import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import 'style-loader!./login.scss';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class Login {

    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;

    public userData: any;
    public errorMessage: string = '';
    public errorLogin: boolean = false;

    constructor(fb: FormBuilder, private _authService: LoginService, private _router: Router) {
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values): void {
        /*this.submitted = true;
        if (this.form.valid) {
            // your code goes here
            // console.log(values);
        }*/

      this._authService.login(values.email, values.password).subscribe(
        data => this.userData = (data),
        error => alert(error),
        () => {
          // console.log(this.userData);
          if (this.userData.isLogged) {
            // this._authService.isLogged = true;
            this._router.navigate(['/pages/dashboard']);
            // Put the object into storage
            localStorage.setItem('userData', JSON.stringify(this.userData.user));
          } else {
            this.errorLogin = true;
            this.errorMessage = 'El usuario o la contraseña no es correcta';
          }
        }
      );

    }
}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Token } from 'src/app/shared/interfaces/token';
import { Notification } from 'src/app/shared/interfaces/notification';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { jwtDecode } from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'bgc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  disallowUse: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenService,
    private notificationService: NotificationService,
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.loginForm = formBuilder.group({
      mail: ['', [Validators.email]],
      phone: [''],
      password: ['', [Validators.required]]
    }, {
      validators: [() => this.mailOrPhone()]
    });
  }

  mailOrPhone() {
    if (!this.loginForm) return null;

    const { mail, phone } = this.loginForm.getRawValue();
    return (mail || phone) ? null : { match: true };
  }

  // TODO: Change this for Google Authentication, login should be for native validation
  // login(user: string, password: string) {
  //   this.authService.login(user, password)
  // }

  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].errors && this.loginForm.controls[controlName].errors![errorName];
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK');
  }

  login() {
    this.disallowUse = true;
    const { mail, phone, password } = this.loginForm.getRawValue();
    this.userService.login(mail, phone, password).subscribe({
      next: (response: Token) => {
        console.log(response);
        setTimeout(() => {
          this.tokenService.save(response.accessToken, response.refreshToken);
          this.router.navigate(['home']);
          const data: any = jwtDecode(response.accessToken);
          const { username, mail, phone } = data;
          this.userService.user.next({ username, mail, phone });

          this.notificationService.socket.emit('joinRoom', data.id);
          this.notificationService.socket.on('commentNotification', (notification:Notification) => {
            console.log('Data received: ', notification);
            this.notificationService.newNotification(notification);
          });
        });
      },
      error: (err: Error) => {
        if (err instanceof HttpErrorResponse) {
          this.openSnackBar('Credenciales incorrectas.');
        } else {
          this.openSnackBar('No fue posible el ingreso.');
        }
        this.disallowUse = false;
      }
    });
  };

}

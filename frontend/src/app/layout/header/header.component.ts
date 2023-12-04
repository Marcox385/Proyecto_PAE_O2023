import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from 'src/app/shared/interfaces/user';
import { Notification } from 'src/app/shared/interfaces/notification';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'bgc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: User = { username: 'Testing' };

  loginStatus: boolean = false;
  notificationNumber: number = 0;
  currentNotifications: Notification[];

  constructor(
    private userService: UserService,
    private router: Router,
    private socialAuth: SocialAuthService,
    private tokenService: TokenService,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {
    userService.user.subscribe((user: User) => {
      this.user = user;
    });

    this.socialAuth.authState.subscribe((user: SocialUser) => {
      console.log('Social user: ', user);
    });

    this.tokenService.loginStatus.subscribe((status: boolean) => {
      this.loginStatus = status;
    });

    this.notificationService.unreadNotifications.subscribe((value: number) => {
      this.notificationNumber = value;
    });

    this.currentNotifications = this.notificationService.currentNotifications;
  }

  readNotifications() {
    this.notificationService.readNotifications();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK');
  }

  logout() {
    this.userService.logout(this.tokenService.getRefreshToken()).subscribe({
      next: (response) => {
        console.log(response);
        this.tokenService.remove();
        this.router.navigate(['login']);
        this.notificationService.socket.disconnect();
        this.openSnackBar('Logout exitoso.');
      },
      error: (err: Error) => {
        console.log(err);
      }
    });
  }
}

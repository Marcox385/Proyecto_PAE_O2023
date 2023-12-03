import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';


@Component({
  selector: 'bgc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: User = { username: 'Testing' };

  loginStatus: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private socialAuth: SocialAuthService,
    private tokenService: TokenService
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
  }

  logout() {
    this.userService.logout(this.tokenService.getRefreshToken()).subscribe({
      next: (response) => {
        console.log(response);
        this.tokenService.remove();
        this.router.navigate(['login']);
      },
      error: (err: Error) => {
        console.log(err);
      }
    });
  }
}

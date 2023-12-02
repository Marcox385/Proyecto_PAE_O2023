import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'bgc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: User = { name: '', email: '' };

  loginStatus: boolean = false;

  constructor(
    userService: UserService,
    private router: Router,
    private socialAuth: SocialAuthService,
    // private loginService: LoginService
  ) {
    userService.selectedUser.subscribe((user: User) => {
      this.user = user;
    });


    this.socialAuth.authState.subscribe((user: SocialUser) => {
      console.log('Social user: ', user);
    })
  }

  logout() {
    this.router.navigate(['login']);
  }
}

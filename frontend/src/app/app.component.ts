import { Component } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { AuthResponse } from './shared/interfaces/authresponse';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from './shared/interfaces/user';
import { Token } from './shared/interfaces/token';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bgc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  user: User = { username: '' };

  loginStatus = true;

  constructor(private auth: AuthService, private authService: SocialAuthService, private router: Router) {
    authService.authState.subscribe((user: SocialUser) => {
      console.log('User: ', user);
      this.loginStatus = true;
      this.user = {
        username: user.name
      };
    });

    const currentUser = auth.currentUserValue;
    this.user = currentUser !== null ? currentUser : { username: '' };
  }


  loginWithGoogle(): void {
    this.auth.loginWithGoogle();
  }

  logout(): void {
    this.auth.logout();
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

}

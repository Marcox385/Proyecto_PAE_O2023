import { Component } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { AuthResponse } from 'src/interfaces/authresponse';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/interfaces/user';
import { Token } from 'src/interfaces/token';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bgc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  user: User = { name: '', email: '' };

  loginStatus = true;

  constructor(private auth: AuthService, private authService: SocialAuthService, private router: Router) {
    authService.authState.subscribe((user: User) => {
      console.log('User: ', user);
      this.loginStatus = true;
      this.user = user;
    });

    const currentUser = auth.currentUserValue;
      this.user = currentUser !== null ? currentUser : { name: '', email: '' };
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

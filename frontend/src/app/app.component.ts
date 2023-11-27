import { Component } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { AuthResponse } from 'src/interfaces/authresponse';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/interfaces/user';
import { Token } from 'src/interfaces/token';

@Component({
  selector: 'bgc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  user: User = { name: '', email: '' };

  loginStatus = true;

  constructor(private authService: SocialAuthService,) {
    authService.authState.subscribe((user: User) => {
      console.log('User: ', user);
      this.loginStatus = true;
      this.user = user;
    });

  }

}

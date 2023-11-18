import { SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'bgc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: User | undefined

  constructor(private authservice: AuthService) {

    this.authservice.user.subscribe((user: User | undefined) => {
      this.user = user;
    });
  }
}

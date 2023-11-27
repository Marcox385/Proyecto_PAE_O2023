import { Injectable, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from 'src/interfaces/token';
import { AuthResponse } from 'src/interfaces/authresponse';
import { User } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  private _user = new BehaviorSubject<User | undefined>(undefined)
  private _token = new BehaviorSubject<Token | undefined>(undefined)

  public get user(): Observable<User | undefined> {
    return this._user
  }

  constructor(private authService: SocialAuthService, private router: Router, private httpCliente: HttpClient) { }

  signOut(): void {
    this.authService.signOut();
  }

  login(user: string, password: string) {
    this.httpCliente.post<AuthResponse>(`${environment.API_URL}/google`, { user, password }).subscribe({
      next: (value: AuthResponse) => {
        this._user.next(value.user);
        this._token.next(value.token);
        this.router.navigate(['']);
      },
      error: err => console.error('Observable emitted an error: ' + err),
    });
  }

  ngOnInit() {      //No lo detecta
    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.httpCliente.post<AuthResponse>(`${environment.API_URL}/google`, user).subscribe({
        next: (value: AuthResponse) => {
          this._user.next(value.user);
          this._token.next(value.token);
          this.router.navigate(['']);
        },
        error: err => console.error('Observable emitted an error: ' + err),
      });
    });
  }
}

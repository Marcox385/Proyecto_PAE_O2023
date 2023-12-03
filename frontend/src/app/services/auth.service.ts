import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from 'src/interfaces/token';
import { AuthResponse } from 'src/interfaces/authresponse';
import { User } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User | undefined>(undefined)
  private _token = new BehaviorSubject<Token | undefined>(undefined)

  public get user(): Observable<User | undefined> {
    return this._user
  }


  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<User | null>(null);

  /* user: Observable<User | null> = this.currentUser.asObservable(); */

  constructor(private authService: SocialAuthService, private http: HttpClient,private router: Router) { }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get currentUserValue(): User | null {
    return this.currentUser.value;
  }

  updateUser(user: User | null): void {
    this.currentUser.next(user);
  }

  signOut(): void {
    this.authService.signOut();
  }

  login(user: string, password: string) {
    this.http.post<AuthResponse>(`${environment.API_URL}/google`, { user, password }).subscribe({
      next: (value: AuthResponse) => {
        this._user.next(value.user);
        this._token.next(value.token);
        this.router.navigate(['']);
      },
      error: err => console.error('Observable emitted an error: ' + err),
    });
  }

  loginWithGoogle(): void {
    this.authService.signIn('google').then(
      (user: SocialUser) => {
        // Handle successful login with Google
        console.log('User: ', user);

        // Envía las credenciales al backend
        this.sendGoogleCredentialsToBackend(user);
      },
      (error: any) => {
        console.error('Error logging in with Google:', error);
        this.loggedIn.next(false);
        this.currentUser.next(null);
      }
    );
  }

  private sendGoogleCredentialsToBackend(user: SocialUser): void {
    // Aquí deberías enviar las credenciales del usuario al backend.
    // Puedes usar el servicio HttpClient para realizar una solicitud al backend.

    const credentials = {
      googleAccessToken: user.authToken  // o cualquier otra propiedad necesaria
      // Puedes agregar más propiedades según los requisitos del backend
    };

    this.http.post<AuthResponse>('/localhost:3200/google', credentials)
      .subscribe(
        (response) => {
          // Lógica después de una autenticación exitosa en el backend (si es necesario)
          this.loggedIn.next(true);
          this.currentUser.next(response.user);
        },
        (error) => {
          console.error('Error during Google login on the backend:', error);
          this.loggedIn.next(false);
          this.currentUser.next(null);
        }
      );
  }

  logout(): void {
    this.authService.signOut().then(
      () => {
        // Handle successful logout
        console.log('User logged out');
        this.loggedIn.next(false);
        this.currentUser.next(null);
      },
      (error: any) => {
        console.error('Error logging out:', error);
      }
    );
  }
}

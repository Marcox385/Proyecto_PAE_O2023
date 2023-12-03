import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  save(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this.loginStatus.next(true);
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken') || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') || '';
  }

  isLoggedIn(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  }

  remove(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.loginStatus.next(false);
  }
}

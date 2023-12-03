import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './../interfaces/user';
import { Token } from './../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>({
    username: ''
  });

  constructor(private httpClient: HttpClient) { }

  // getUsers(): Observable<User[]> {
  //   const url: string = environment.apiUrl + 'users';
  //   return this.httpClient.get<User[]>(url);
  // }

  getUser(data: User) {
    this.user.next(data);
  }

  setUser(user: User) {
    this.user.next(user);
  }

  register(username: string, mail: string, phone: string, password: string) {
    const url: string = environment.API_URL + 'api/users/register';
    return this.httpClient.post(url, { username, mail, phone, password });
  }

  login(mail: string, phone: string, password: string): Observable<Token> {
    const url: string = environment.API_URL + 'auth/login';
    return this.httpClient.post<Token>(url, { mail, phone, password });
  }

  logout(refreshToken: string) {
    const url: string = environment.API_URL + 'auth/logout';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { refreshToken }
    };

    return this.httpClient.delete(url, options);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: BehaviorSubject<User> = new BehaviorSubject<User>({
    name: '',
    email: ''
  });

  constructor(private httpClient: HttpClient) { }

  // getUsers(): Observable<User[]> {
  //   const url: string = environment.apiUrl + 'users';
  //   return this.httpClient.get<User[]>(url);
  // }

  setUser(user: User) {
    this.selectedUser.next(user);
  }
}

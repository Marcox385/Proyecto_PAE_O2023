import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getPublicationById(id: string): Observable<any> {
    const url = `${environment.API_URL}/posts/new`;
    return this.http.get(url);
  }

  newPost(title: string, description: string, tags: string): Observable<any> {
    const tagsSplit = tags.split(',');
    const body = {
      title,
      description,
      tags: tagsSplit
    };

    const url = `${this.apiUrl}/posts/new`;
    return this.http.post(url, body);
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get(url);
  }
}
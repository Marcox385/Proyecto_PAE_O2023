import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _publications: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public readonly publications$: Observable<any[]> = this._publications.asObservable();

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  addPost(data: object): Observable<any> {
    // const currentPublications = this._publications.value;
    // currentPublications.push(newPublication);
    // this._publications.next(currentPublications);

    const url = `${environment.API_URL}api/posts/new`;

    const headers = {
      // 'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${this.tokenService.getAccessToken()}`
    }

    return this.httpClient.post(url, data, { headers });
  }

  getPosts(searchTerm: string): Observable<any> {
    const url = `${environment.API_URL}api/posts`;

    const params = new HttpParams()
      .set('title', searchTerm);

    const headers = {
      // 'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${this.tokenService.getAccessToken()}`
    }

    return this.httpClient.get(url, { params, headers });
  }
}

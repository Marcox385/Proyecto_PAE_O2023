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
    const url = `${this.apiUrl}/publications/${id}`; // Ajusta la URL según tu API
    return this.http.get(url);
  }
}

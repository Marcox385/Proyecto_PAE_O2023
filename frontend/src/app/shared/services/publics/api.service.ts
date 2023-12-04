// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private apiUrl = environment.GPT_API;

  constructor(private http: HttpClient) { }

  // obtenerDatos(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/ruta-de-endpoint`);
  // }
}

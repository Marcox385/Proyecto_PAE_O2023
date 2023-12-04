import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _publications: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public readonly publications$: Observable<any[]> = this._publications.asObservable();

  agregarPublicacion(publication: any, userName: string, date: string) {
    const newPublication = { ...publication, user: userName, date: date };
    const currentPublications = this._publications.value;
    currentPublications.push(newPublication);
    this._publications.next(currentPublications);
  }

  obtenerPublicaciones(): Observable<any[]> {
    return this.publications$;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private publications: any[] = [];

  agregarPublicacion(publication: any, user: string, date: string) {
    const newPublication = {
      ...publication,
      user,
      date,
    };
    this.publications.push(newPublication);
  }

  obtenerPublicaciones() {
    return this.publications;
  }
}

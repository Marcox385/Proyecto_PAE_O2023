import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from 'src/app/services/publics/publication.service';

@Component({
  selector: 'bgc-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
  publicacionId: string | null = null; // Almacena el id de la publicación
  publicationData: any = '';

  constructor(private route: ActivatedRoute, private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.publicacionId = params.get('id');
      if (this.publicacionId) {
        this.publicationService.getPublicationById(this.publicacionId).subscribe(
          (data) => {
            // Aquí asigna los datos obtenidos a propiedades del componente o realiza las acciones necesarias
            // Por ejemplo, podrías asignar los datos a una propiedad llamada publicationData
            // this.publicationData = data;
          },
          (error) => {
            console.error('Error al obtener la información de la publicación:', error);
            // Maneja el error según tus necesidades
          }
        );
      }
    });
  }
}

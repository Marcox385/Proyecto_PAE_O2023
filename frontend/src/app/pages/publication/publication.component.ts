import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PublicationService } from 'src/app/shared/services/publics/publication.service';
import { RecuadroComponent } from 'src/app/layout/recuadro/recuadro.component';

@Component({
  selector: 'bgc-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
  publicacionId: string | null = null; // Almacena el id de la publicación
  publicationData: any = '';

  constructor(private route: ActivatedRoute, private publicationService: PublicationService, private dialog: MatDialog) { }

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

  gptResponse(): void {
    this.dialog.open(RecuadroComponent, {
      width: '400px',
      height: '600px',
      data: { /* Puedes pasar datos al recuadro si es necesario */ }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PublicationService } from 'src/app/shared/services/publics/publication.service';
import { RecuadroComponent } from 'src/app/layout/recuadro/recuadro.component';
import { environment } from 'src/environments/environment';

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
            this.publicationData = data;
          },
          (error) => {
            console.error('Error al obtener la información de la publicación:', error);
          }
        );
      }
    });
  }

  gptResponse(): void {
    this.dialog.open(RecuadroComponent, {
      width: '400px',
      height: '600px',
      data: { /*Pasar dato?*/ }
    });
  }

  enviarComentario() {
    const newComment = {
      user: "Juan?",
      date: new Date().toISOString(),
      description: "El comentario del usuario"
    };

    // Agregar el comentario al arreglo de comentarios de la publicación
    this.publicationData.comments.push(newComment);

    // llamada al backend 
    const url = `${environment.API_URL}/posts/`;

    // Actualizar la vista
    // Llamada. hacer algo como:
    // this.publicationData = { ...this.publicationData };
  }
}

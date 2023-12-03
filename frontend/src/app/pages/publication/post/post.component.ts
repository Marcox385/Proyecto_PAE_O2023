import { Component } from '@angular/core';
import { PostService } from 'src/app/services/publics/post.service';

@Component({
  selector: 'bgc-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  constructor(private postService: PostService) { }

  enviarPublicacion(formulario: any) {
    const userName = "Juan?";
    const date = new Date().toISOString();

    const newPublication = {
      titulo: formulario.title,
      etiquetas: formulario.tags,
      descripcion: formulario.description,
    };

    this.postService.agregarPublicacion(newPublication, userName, date);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/publics/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'bgc-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  publicacionForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router, private snackBar: MatSnackBar,
  ) {
    // Inicializar el formulario principal
    this.publicacionForm = this.fb.group({
      titulo: ['', Validators.required],
      code: [''],
      etiquetas: [''],
      descripcion: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    console.log('info guardada');
  }

  enviarPublicacion() {
    const userName = "Juan?";
    const date = new Date().toISOString();

    const newPublication = {
      title: this.publicacionForm.value.titulo,
      tags: this.publicacionForm.value.etiquetas,
      code: this.publicacionForm.value.code,
      description: this.publicacionForm.value.descripcion,
      user: userName,
      date: date,
    };

    this.postService.agregarPublicacion(newPublication, userName, date);

    this.snackBar.open('Publicación exitosa', 'Cerrar', {
      duration: 10000,
    });

    this.router.navigate(['/home']);
  }
}

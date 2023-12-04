import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/publics/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'src/app/shared/services/token.service';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'bgc-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  publicacionForm: FormGroup;
  user: User = { username: '' };

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    // Inicializar el formulario principal
    this.publicacionForm = this.fb.group({
      title: ['', Validators.required],
      tags: [''],
      description: ['', Validators.required],
    });

    userService.user.subscribe((user: User) => {
      this.user = user;
    });
  }
  ngOnInit(): void {
    console.log('info guardada');
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK');
  }

  enviarPublicacion() {
    // const date = new Date().toISOString();

    const newPublication = {
      title: this.publicacionForm.value.title,
      tags: this.publicacionForm.value.tags.split(','),
      description: this.publicacionForm.value.description,
      notifyUser: true
    };

    this.postService.addPost(newPublication).subscribe({
      next: (response: any) => {
        console.log(response);
        this.openSnackBar('Publicación creada');
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

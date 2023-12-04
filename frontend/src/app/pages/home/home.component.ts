import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/publics/post.service';

@Component({
  selector: 'bgc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  publications: any[] = [];

  constructor(private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    console.log('Successful access');
    this.postService.obtenerPublicaciones().subscribe((publications) => {
      this.publications = publications;
    });
  }

  routePublication(publicationId: string) {
    this.router.navigate(['/publication', publicationId]);
  }
}

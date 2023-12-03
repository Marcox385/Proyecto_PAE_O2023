import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PostService } from 'src/app/services/publics/post.service';

@Component({
  selector: 'bgc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  publications: any[] = [];

  constructor(private router: Router, private postService: PostService) {
    this.publications = this.postService.obtenerPublicaciones();
  }

  ngOnInit(): void {
    console.log('Successfull access');
  }

  routePulication() {
    this.router.navigate(['/publication']);
  }
}

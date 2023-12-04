import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { PostService } from 'src/app/shared/services/publics/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'bgc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user: User = {username: ''};
  publications: any[] = [];

  constructor(
    private router: Router,
    private postService: PostService,
    private userService: UserService
  ) {
    userService.user.subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    console.log('Successful access');
    this.postService.getPosts('').subscribe((publications) => {
      this.publications = publications;
    });
  }

  routePublication(publicationId: string) {
    this.router.navigate(['/publication', publicationId]);
  }
}

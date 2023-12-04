import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/publics/post.service';

@Component({
  selector: 'bgc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchForm: FormGroup;
  searchTerm: string = '';
  results: any = [];

  constructor(
    formBuilder: FormBuilder,
    private postService: PostService
  ) {
    this.searchForm = formBuilder.group({
      searchTerm: ['']
    });
  }

  searchPosts() {
    this.postService.getPosts(this.searchTerm).subscribe({
      next: (response: any) => {
        console.log('Response', response);
        this.results = response;
      },
      error: (error: any) => {
        console.log('Error', error);
      }
    })
  }

}

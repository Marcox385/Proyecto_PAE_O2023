import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PublicationComponent } from './pages/publication/publication.component';
import { ConfigComponent } from './pages/config/config.component';
import { PuplishedCommentsComponent } from './pages/publication/puplished-comments/puplished-comments.component';
import { PostComponent } from './pages/publication/post/post.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'publication', component: PublicationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'published-comments', component: PuplishedCommentsComponent },
  { path: 'post', component: PostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

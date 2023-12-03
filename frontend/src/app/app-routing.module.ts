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
import { NotfoundComponent } from './pages/notfound/notfound.component';

import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] }, 
  { path: 'signup', component: SignupComponent, canActivate: [UnauthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'publication', component: PublicationComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'config', component: ConfigComponent, canActivate: [AuthGuard] },
  { path: 'published-comments', component: PuplishedCommentsComponent, canActivate: [AuthGuard] },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: NotfoundComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

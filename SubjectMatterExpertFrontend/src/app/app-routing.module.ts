import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./core/components/register-form/register-form.component";
import { LoginPageComponent } from './core/components/login/login-page/login-page.component';
import { ForgotPasswordComponent } from './core/components/forgotPassword-page/forgot-password/forgot-password.component';
import { ProfilePageComponent } from './core/components/profile/profile-page/profile-page.component';
import { HomepageComponent } from './core/components/homepage/homepage.component';
import { DocumentSessionsFormComponent } from './core/components/document-sessions/document-sessions-form/document-sessions-form.component';
import { DocumentSessionsComponent } from './core/components/document-sessions/document-sessions.component';
import { SmeBookMeetingComponent } from './core/sme-book-meeting/sme-book-meeting.component';

const routes: Routes = [
  {path: 'login', component : LoginPageComponent},
  {path: 'homepage', component : HomepageComponent},
  {path: 'forgotPassword', component : ForgotPasswordComponent},
  {path: 'profile', component : ProfilePageComponent},
  {path: 'sessionForm', component : DocumentSessionsFormComponent},
  {path: 'document-session', component : DocumentSessionsComponent},
  {path: 'book-meeting', component : SmeBookMeetingComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

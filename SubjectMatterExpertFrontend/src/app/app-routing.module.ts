import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./core/components/register-form/register-form.component";
import { LoginPageComponent } from './core/components/login/login-page/login-page.component';
import { ForgotPasswordComponent } from './core/components/forgotPassword-page/forgot-password/forgot-password.component';
import { HomepageComponent } from './core/components/homepage/homepage.component';
import { SmeListComponent } from './core/components/sme-list/sme-list.component';
import { SmeBookMeetingComponent } from './core/sme-book-meeting/sme-book-meeting.component';
import { LearningAndDevelopmentComponent } from './core/components/learning-and-development/learning-and-development.component';

const routes: Routes = [
  {path: 'login', component : LoginPageComponent},
  {path: 'homepage', component : HomepageComponent},
  {path: 'forgotPassword', component : ForgotPasswordComponent},
  {path: 'sme-list', component : SmeListComponent},
  {path: 'book-meeting', component : SmeBookMeetingComponent},
  {path: 'learning-development', component : LearningAndDevelopmentComponent}
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

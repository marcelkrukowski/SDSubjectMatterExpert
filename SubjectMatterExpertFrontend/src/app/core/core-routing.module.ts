import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./components/home/homepage.component";
import {LoginPageComponent} from "./components/login/login-page.component";
import {RegisterFirstPageComponent} from "./components/register/register-first-page/register-first-page.component";
import {RegisterSecondPageComponent} from "./components/register/register-second-page/register-second-page.component";
import {RegisterFinalPageComponent} from "./components/register/register-final-page/register-final-page.component";
import {SmeListComponent} from "./components/sme-list/sme-list.component";
import {SmeBookMeetingComponent} from "./components/book-meeting/sme-book-meeting.component";
import {ProfilePageComponent} from "./components/profile-page/profile-page.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import { LearningAndDevelopmentComponent } from './components/learning-and-development/learning-and-development.component';
import { DocumentSessionsFormComponent } from './components/document-sessions/document-sessions-form/document-sessions-form.component';
import { DocumentSessionsComponent } from './components/document-sessions/document-sessions.component';

import { RequestToBeSmeListComponent } from './components/request-to-be-sme-list/request-to-be-sme-list.component';
import { EditDocumentSessionsFormComponent } from './components/document-sessions/edit-document-sessions-form/edit-document-sessions-form.component';
 
// TODO: add 404 page & redirect user there if no URL was matched.
const routes: Routes = [
  {path: 'login', component: LoginPageComponent },
  // {path: 'home', component: HomepageComponent },
  {path: 'sme-list', component: SmeListComponent},
  {path: 'register', component: RegisterFirstPageComponent },
  {path: 'register-second', component: RegisterSecondPageComponent},
  {path: 'register-final', component: RegisterFinalPageComponent},
  {path: 'sme-book-meeting', component: SmeBookMeetingComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'learning-development', component: LearningAndDevelopmentComponent },
  {path: 'session-form', component: DocumentSessionsFormComponent},
  {path: 'document-session', component: DocumentSessionsComponent},
  {path: 'edit-session-form/:id', component: EditDocumentSessionsFormComponent},
  {path: 'request-to-be-sme', component: RequestToBeSmeListComponent},
  {path: '**', redirectTo: '/login', pathMatch: "full" },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
 
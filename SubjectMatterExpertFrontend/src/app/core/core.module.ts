import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SmeBookMeetingComponent} from "./components/book-meeting/sme-book-meeting.component";
import {SmeListComponent} from "./components/sme-list/sme-list.component";
import {RegisterFinalPageComponent} from "./components/register/register-final-page/register-final-page.component";
import {RegisterSecondPageComponent} from "./components/register/register-second-page/register-second-page.component";
import {RegisterFirstPageComponent} from "./components/register/register-first-page/register-first-page.component";
import {LoginPageComponent} from "./components/login/login-page.component";
import {HomepageComponent} from "./components/home/homepage.component";
import {ProfilePageComponent} from "./components/profile-page/profile-page.component";
import { RequestToBeSmeListComponent } from './components/request-to-be-sme-list/request-to-be-sme-list.component';
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {BrowserModule} from "@angular/platform-browser";
import { LearningAndDevelopmentComponent } from './components/learning-and-development/learning-and-development.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DocumentSessionsComponent } from './components/document-sessions/document-sessions.component';
import { DocumentSessionsFormComponent } from './components/document-sessions/document-sessions-form/document-sessions-form.component';
import { CoreRoutingModule } from './core-routing.module';
import { ViewDetailsModalComponent } from '../shared/components/view-details-modal/view-details-modal.component';
import { EditDocumentSessionsFormComponent } from './components/document-sessions/edit-document-sessions-form/edit-document-sessions-form.component';
import { SessionListTemplateComponent } from './shared/session-list-template/session-list-template.component';

@NgModule({
  declarations: [
    CoreComponent,
    RegisterFirstPageComponent,
    RegisterSecondPageComponent,
    RegisterFinalPageComponent,
    SmeListComponent,
    SmeBookMeetingComponent,
    LoginPageComponent,
    HomepageComponent,
    ProfilePageComponent,
    RequestToBeSmeListComponent,
    ForgotPasswordComponent,
    LearningAndDevelopmentComponent,
    DocumentSessionsComponent,
    DocumentSessionsFormComponent,
    EditDocumentSessionsFormComponent,
    SessionListTemplateComponent,
  ],
  exports: [
    SmeListComponent,
    SmeBookMeetingComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HighchartsChartModule,
    ViewDetailsModalComponent,
  ]
})
export class CoreModule { }

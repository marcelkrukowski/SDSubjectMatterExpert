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
import { CoreRoutingModule } from './core-routing.module';
import { EditPictureTemplateComponent } from '../shared/components/edit-picture-template/edit-picture-template.component';

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
    EditPictureTemplateComponent
  ]
})
export class CoreModule { }

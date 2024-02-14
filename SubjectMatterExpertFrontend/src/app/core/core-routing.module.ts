import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./components/home/homepage.component";
import {LoginPageComponent} from "./components/login/login-page.component";
import {RegisterFirstPageComponent} from "./components/register/register-first-page/register-first-page.component";
import {RegisterSecondPageComponent} from "./components/register/register-second-page/register-second-page.component";
import {RegisterFinalPageComponent} from "./components/register/register-final-page/register-final-page.component";
import {SmeListComponent} from "./components/sme-list/sme-list.component";
import {SmeBookMeetingComponent} from "./components/book-meeting/sme-book-meeting.component";

// TODO: add 404 page & redirect user there if no URL was matched.
const routes: Routes = [
  {path: 'home', component: HomepageComponent },
  {path: 'login', component: LoginPageComponent },
  {path: 'register', component: RegisterFirstPageComponent },
  {path: 'register-second', component: RegisterSecondPageComponent},
  {path: 'register-final', component: RegisterFinalPageComponent},
  {path: 'sme-list', component: SmeListComponent},
  {path: 'sme-book-meeting', component: SmeBookMeetingComponent},
  {path: '**', redirectTo: '/home', pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

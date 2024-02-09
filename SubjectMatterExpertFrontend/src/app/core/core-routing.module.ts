import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import {RegisterFormComponent} from "./components/register-form/register-form.component";
import {FirstPageComponent} from "./components/register-form/first-page/first-page.component";
import {SecondPageComponent} from "./components/second-page/second-page.component";
import {FinalPageComponent} from "./components/register-form/final-page/final-page.component";
import {SmeListComponent} from "./components/sme-list/sme-list.component";

const routes: Routes = [
  // { path: 'register', redirectTo: '/register-first-page', pathMatch: "full"},
  { path: 'register-first-page', component: FirstPageComponent},
  { path: 'register-second-page', component: SecondPageComponent},
  { path: 'register-final', component: FinalPageComponent},
  {path: 'register', component: FirstPageComponent},
  {path: 'sme-list', component: SmeListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import {RegisterFormComponent} from "./register-form/register-form.component";
import {FirstPageComponent} from "./register-form/first-page/first-page.component";
import {SecondPageComponent} from "./register-form/second-page/second-page.component";
import {FinalPageComponent} from "./register-form/final-page/final-page.component";

const routes: Routes = [
  // { path: 'register', redirectTo: '/register-first-page', pathMatch: "full"},
  { path: 'register-first-page', component: FirstPageComponent},
  { path: 'register-second-page', component: SecondPageComponent},
  { path: 'register-final', component: FinalPageComponent},
  {path: 'register', component: FirstPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

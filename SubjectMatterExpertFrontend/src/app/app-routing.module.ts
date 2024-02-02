import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./core/components/register-form/register-form.component";
import { LoginPageComponent } from './core/components/login/login-page/login-page.component';
import { HomePageComponent } from './core/components/homepage/home-page/home-page.component';
import { ForgotPasswordComponent } from './core/components/forgotPassword-page/forgot-password/forgot-password.component';
import { ProfilePageComponent } from './core/components/profile/profile-page/profile-page.component';

const routes: Routes = [
  {path: 'login', component : LoginPageComponent},
  {path: 'homepage', component : HomePageComponent},
  {path: 'forgotPassword', component : ForgotPasswordComponent},
  {path: 'profile', component : ProfilePageComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

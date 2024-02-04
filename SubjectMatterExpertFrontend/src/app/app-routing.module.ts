import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './core/components/login/login-page/login-page.component';
import { ForgotPasswordComponent } from './core/components/forgotPassword-page/forgot-password/forgot-password.component';
import { HomepageComponent } from './core/components/homepage/homepage.component';

const routes: Routes = [
  {path: 'login', component : LoginPageComponent},
  {path: 'homepage', component : HomepageComponent},
  {path: 'forgotPassword', component : ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './core/components/login/login-page/login-page.component';
import { HomePageComponent } from './core/components/homepage/home-page/home-page.component';

const routes: Routes = [
  {path: 'login', component : LoginPageComponent},
  {path: 'homepage', component : HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

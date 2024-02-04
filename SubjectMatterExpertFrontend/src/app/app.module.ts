import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './core/components/login/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './core/components/forgotPassword-page/forgot-password/forgot-password.component';
import { HomepageComponent } from './core/components/homepage/homepage.component';
import { SidenavComponent } from './core/shared/components/sidenav/sidenav.component';
import { BodyTemplateComponent } from './core/shared/components/sidenav/body-template/body-template.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ForgotPasswordComponent,
    HomepageComponent,
    SidenavComponent,
    BodyTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule  //To use external API
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

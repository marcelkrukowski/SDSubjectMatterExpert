import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './core/components/login/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './core/components/homepage/home-page/home-page.component';
import { ForgotPasswordComponent } from './core/components/forgotPassword-page/forgot-password/forgot-password.component';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import { ProfilePageComponent } from './core/components/profile/profile-page/profile-page.component';
import { interceptorsProviders } from './core/interceptor/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    ForgotPasswordComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule  //To use external API
  ],
  providers: [interceptorsProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

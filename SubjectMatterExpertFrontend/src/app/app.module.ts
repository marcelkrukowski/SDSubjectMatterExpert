import { Input, NgModule, signal } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './core/components/login/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './core/components/forgotPassword-page/forgot-password/forgot-password.component';
import { HomepageComponent } from './core/components/homepage/homepage.component';
import { SidenavComponent } from './core/shared/components/sidenav/sidenav.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import { HighchartsChartModule } from 'highcharts-angular';
import { LearningAndDevelopmentComponent } from './core/components/learning-and-development/learning-and-development.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ForgotPasswordComponent,
    HomepageComponent,
    SidenavComponent,
    LearningAndDevelopmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    HighchartsChartModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val:boolean){
    this.sideNavCollapsed.set(val);
  }
 }

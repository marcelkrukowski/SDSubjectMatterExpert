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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {CoreModule} from "./core/core.module";
import {SidenavComponent} from "./shared/components/sidenav/sidenav.component";
import {interceptorsProviders} from "./core/interceptor/interceptor";
import { HeaderProfileComponent } from './shared/components/header-profile-component/header-profile-component.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { SdworxModalComponent } from './shared/components/sdworx-modal/sdworx-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    HeaderProfileComponent,
    ModalModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(),
    interceptorsProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val:boolean){
    this.sideNavCollapsed.set(val);
  }
 }

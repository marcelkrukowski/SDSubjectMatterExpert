import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FirstPageComponent } from './components/register-form/first-page/first-page.component';
import { SecondPageComponent } from './components/second-page/second-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FinalPageComponent } from './components/register-form/final-page/final-page.component';
import { SmeListComponent } from './components/sme-list/sme-list.component';
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [
    CoreComponent,
    RegisterFormComponent,
    FirstPageComponent,
    SecondPageComponent,
    FinalPageComponent,
    SmeListComponent
  ],
  exports: [
    SmeListComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class CoreModule { }

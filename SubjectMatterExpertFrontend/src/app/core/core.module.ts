import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FirstPageComponent } from './components/register-form/first-page/first-page.component';
import { SecondPageComponent } from './components/second-page/second-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FinalPageComponent } from './components/register-form/final-page/final-page.component';


@NgModule({
  declarations: [
    CoreComponent,
    RegisterFormComponent,
    FirstPageComponent,
    SecondPageComponent,
    FinalPageComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./core/register-form/register-form.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  // Other routes...
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

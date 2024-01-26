import { Component } from '@angular/core';
import {RegisterFormService} from "../register-form.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss'],
})
export class SecondPageComponent {
  constructor(public formService: RegisterFormService, private router: Router) {}

  submitForm(): void {
    this.router.navigate(['/register-final']);
  }
}

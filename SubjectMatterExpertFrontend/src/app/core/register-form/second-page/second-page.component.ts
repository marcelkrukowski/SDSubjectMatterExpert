import { Component } from '@angular/core';
import {RegisterFormService} from "../register-form.service";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss'],
})
export class SecondPageComponent {
  public form: FormGroup<any>;
  constructor(public formService: RegisterFormService, private router: Router) {
    this.form = this.formService.getForm();
  }

  submitForm(): void {
    this.router.navigate(['/register-final']);
  }
}

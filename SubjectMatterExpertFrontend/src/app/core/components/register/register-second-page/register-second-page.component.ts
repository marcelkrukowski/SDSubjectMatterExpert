import { Component } from '@angular/core';
import {RegisterFormService} from "../../../services/register-form.service";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register-second-page',
  templateUrl: './register-second-page.component.html',
  styleUrls: ['./register-second-page.component.scss'],
})
export class RegisterSecondPageComponent {
  public form: FormGroup<any>;
  constructor(public formService: RegisterFormService, private router: Router) {
    this.form = this.formService.getForm();
  }

  submitForm(): void {
    this.router.navigate(['/register-final']);
  }
}

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {RegisterFormService} from "../../../services/register-form.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register-first-page',
  templateUrl: './register-first-page.component.html',
  styleUrls: ['./register-first-page.component.scss'],
})
export class RegisterFirstPageComponent implements OnInit {
  public form: FormGroup;
  public isEmailValid? = false;
  public isPassValid? = false;
  public isRepeatPassValid? = false;
  constructor(private router: Router, public formService: RegisterFormService) {
    this.form = this.formService.getForm();
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.updateValidity();
    });
  }

  updateValidity(): void {
    this.isEmailValid = this.form.get('email')?.valid;
    this.isPassValid = this.form.get('password')?.valid;
    this.isRepeatPassValid = this.form.get('repeatPassword')?.valid;
  }
  nextPage(): void {
    if (this.isEmailValid && this.isPassValid && this.isRepeatPassValid) {
      this.router.navigate(['/register-register-second-page']);
    }
  }
}

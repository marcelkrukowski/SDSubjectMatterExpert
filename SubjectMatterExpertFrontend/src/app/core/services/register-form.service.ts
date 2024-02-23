import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  private readonly registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@sdworx\.com$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.validatePasswordStrength()
        ],
      ],
      repeatPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ],
      name: ['', Validators.required],
      surname: ['', Validators.required],
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  getForm(): FormGroup {
    return this.registrationForm;
  }

  registerUser(): Observable<any> {
    console.log("Register clicked");
    const formData = this.registrationForm.value;
    const registrationData = {
      username: formData.email, // Assuming username is the email
      password: formData.password,
      email: formData.email,
      firstname: formData.name,
      lastname: formData.surname
    };

    console.table(registrationData);
    console.log(`api url: ${environment.apiUrl}/api/Account/register`);

    return this.http.post(`${environment.apiUrl}/api/Account/register`, registrationData).pipe(
      tap((response: any) => {
        this.storageService.set('token', response.token);
      })
    );
  }

  private passwordsMatchValidator = (control: FormGroup): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    return password && repeatPassword && password.value !== repeatPassword.value ? { 'passwordsDoNotMatch': true } : null;
  };

  private validatePasswordStrength(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      if (password) {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (!strongRegex.test(password)) {
          return { 'weakPassword': true };
        }
      }
      return null;
    };
  }
}

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  private registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@sdworx\.com$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
  }

  getForm(): FormGroup {
    return this.registrationForm;
  }
}

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  private readonly registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

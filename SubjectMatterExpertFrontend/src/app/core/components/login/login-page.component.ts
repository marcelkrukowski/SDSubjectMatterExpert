import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  errorMessage = '';
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private serviceStorageService: StorageService,
    private router: Router
  ) {}

  login(): void {
    this.isLoading = true;
      this.apiService.request('login', 'post', this.loginForm.value).subscribe({
        next: (result: any) => {
          this.serviceStorageService.set('token', result.token)
          console.log(result.token);
          this.isLoading = false;
          this.router.navigate(['/sme-list']);
        },
        error: (error: any) => {
          this.isLoading = false;
          if (error.status === 401) {
            this.errorMessage = 'Incorrect credentials!'
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
  }
}

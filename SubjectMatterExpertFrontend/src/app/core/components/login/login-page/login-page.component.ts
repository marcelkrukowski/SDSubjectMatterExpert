import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ServiceLoginService } from 'src/app/core/services/api.service';
import { ServiceStorageService } from 'src/app/core/services/service-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  loginForm?: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private serviceLoginService: ServiceLoginService,
    private serviceStorageService: ServiceStorageService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    
  }

  login() {
    // Check if the form is valid before attempting to log in
    if (this.loginForm?.valid) {
      this.serviceLoginService.request('login', 'post', this.loginForm?.value).subscribe((result: { [key: string]: any }) => {

          if (result) {         
            console.log("Login results: ", result);
            this.serviceStorageService.set('SMEuser', result); 
            console.log("Testing storage service", this.serviceStorageService.get('SMEuser')?.location);
    
            // Successful login logic
            // Navigate to the homepage
            this.router.navigate(['/profile']);
          }
        },
        // Handle any errors from the HTTP request
        (error) => {
          // Check for specific HTTP error status codes
          if (error.status === 401) {
            // Unauthorized error (e.g., incorrect credentials)
            console.error('Login unsuccessful:', error);

            if (error.error.includes('Invalid email!')){
              this.errorMessage = 'Incorrect email!';
            }
            if (error.error.includes('Invalid password!')){
              this.errorMessage = 'Incorrect password!';
            }

            
          }
          else if (error.status === 500) {
            // Internal server error
            console.error('Login failed:', error);
            this.errorMessage = 'An internal server error occurred. Please try again later.';
          } else {
            // For other error statuses
            console.error('Login failed:', error);
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      );
    } else {
      // Form is invalid, set appropriate error message
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
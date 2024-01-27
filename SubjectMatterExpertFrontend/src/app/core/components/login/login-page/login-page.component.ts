import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ServiceLoginService } from 'src/app/core/services/service-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  loginForm?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviceLoginService: ServiceLoginService,
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

login() {
  
    if (this.loginForm?.valid) {
        console.log("Login Form: ", this.loginForm.value);
        this.serviceLoginService.request('login', 'post', this.loginForm.value).subscribe((result: { [key: string]: any }) => {
            console.log("Login results: ", result);
        });
    } else {
        console.error("Invalid form. Please fill in all required fields.");
    }
}

  


}
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  loginForm? : FormGroup;

  constructor(
    private formBuilder : FormBuilder
  ){

  }

  ngOnInit():void{
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required],
    })
  }

  login(){
    console.log("Login Form: ", this.loginForm?.value);
  }

}
import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {UserDetailsService} from "../../services/user-details.service";
import {Observable} from "rxjs";
import {User} from "../../../../models/user.model";


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userDetails$!: Observable<User>;
  ngOnInit(): void {
    this.userDetails$ = this.userService.getUserDetails();
    this.userDetails$.subscribe(e => console.log(e));
  }

  constructor(
    private userService: UserDetailsService
  ) { }
}



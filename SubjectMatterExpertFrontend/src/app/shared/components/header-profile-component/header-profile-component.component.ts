import { CommonModule, KeyValue } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import {
  SdwdsHeaderProfileButtonComponent,
  SdwdsHeaderProfileComponent,
  SdwdsHeaderProfileLinkComponent,
  SdwdsHeaderProfileListComponent,
  SdwdsHeaderProfileSelectComponent,
} from '@sdworx/sdwds/header-profile';
import { Observable } from 'rxjs';
import { UserDetailsService } from '../../../core/services/user-details.service';
import { User } from 'src/models/user.model';
@Component({
  selector: 'sdwds-docs-header-profile',
  standalone: true,
  imports: [
    CommonModule,
    SdwdsHeaderProfileComponent,
    SdwdsHeaderProfileButtonComponent,
    SdwdsHeaderProfileLinkComponent,
    SdwdsHeaderProfileSelectComponent,
    SdwdsHeaderProfileListComponent,
    NgbDropdownModule,
  ],
  templateUrl: './header-profile-component.component.html',
})
export class HeaderProfileComponent {
  
  userDetails$!: Observable<User>;
  

  ngOnInit(): void {
    this.userDetails$ = this.userService.getUserDetails();
    this.userDetails$.subscribe(e => console.log(e));
    this.userDetails$.subscribe((e: any) => console.log(e.username));

  }

  constructor(
    private userService: UserDetailsService,
    private router: Router
  ) { }

  selectCompany(title: string) {
    alert('company selected: ' + title);
  }

  //logout function
  logout() {
    console.log("Login out"); 
    // Clear all stored items in the storage service
    localStorage.removeItem('token');   
    // show back login form again
    this.router.navigate(['/login']);
  }
}
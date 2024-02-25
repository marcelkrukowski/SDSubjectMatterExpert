import { CommonModule, KeyValue } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import {
  SdwdsHeaderProfileButtonComponent,
  SdwdsHeaderProfileComponent,
  SdwdsHeaderProfileLinkComponent,
  SdwdsHeaderProfileListComponent,
  SdwdsHeaderProfileSelectComponent,
} from '@sdworx/sdwds/header-profile';
import { Observable, filter } from 'rxjs';
import { UserDetailsService } from '../../../core/services/user-details.service';
import { User } from 'src/models/user.model';
import { ApiService } from 'src/app/core/services/api.service';
import { PendingSmeRequestService } from 'src/app/core/services/pending-sme-request.service';
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
export class HeaderProfileComponent implements OnInit {

  userDetails$!: Observable<User>;
  notification: boolean = false;

  ngOnInit(): void {

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Check if the current route is the home page
      if (event.url.includes('/login')) {

        console.log("epps");

      }

      else if (event.url.includes('/')) {
        // Execute your logic here
        this.userDetails$ = this.userService.getUserDetails();
        this.userDetails$.subscribe(e => console.log(e));
        this.userDetails$.subscribe((e: any) => console.log(e.userName));

        //get user details, loop throught role to see if user is agile coach
        this.userDetails$.subscribe(e => {
          e.userRoles.forEach(role => {
            if (role.role === 'agile coach') {
              // if user is agile coach check if there are pending sme requests
              console.log('User is an agile coach');
              this.checkPendingSmeRequests();

            }
          
          });

        });
        
      }
    
    });



  }

  constructor(
    private userService: UserDetailsService,
    private pendingSmeRequestService: PendingSmeRequestService,
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

  //get notification if there is requeest for sme
  checkPendingSmeRequests(): void {

    this.pendingSmeRequestService.getPendingSmeRequest().subscribe((data: any[]) => {
      if (data && data.length > 0) {
        // Trigger a notification to alert the user about pending requests
        console.log("aaaaaaaa", this.pendingSmeRequestService);
        
        this.notification = true;
        // You can also navigate the user to a specific page to handle these requests
      }
      else {
        console.log("no pending request");

      }
    });
  }
}
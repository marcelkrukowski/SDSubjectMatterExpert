import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetailsService } from 'src/app/core/services/user-details.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  userDetails$!: Observable<User>;

  isAgileCoach: boolean = true;

  isCollapsed: boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateSidenavDisplay();
  }
  private sidenav: HTMLElement | null = null;
  private sidenavContent: HTMLElement | null = null;


  constructor(private router: Router, private userService: UserDetailsService) {}


  ngOnInit(): void {
    this.sidenav = document.querySelector('.sidenav') as HTMLElement;
    this.sidenavContent = document.querySelector('.sidenav-content') as HTMLElement;
    this.updateSidenavDisplay();

    // Subscribe to route changes 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSidenavDisplay();
      }


      
      if (this.router.url.includes('login') || this.router.url.includes('register')) {
        console.log("epss");
        
      }

      else{
        
      }
      this.userDetails$ = this.userService.getUserDetails();
      this.userDetails$.subscribe(e => {
        if (e.userRoles.length > 1){
        this.updateSidenavDisplay();
        
      }
      });
    });
    
  }
  private updateSidenavDisplay(): void {
    const windowWidth = window.innerWidth;
    if (this.router.url.includes('login') || this.router.url.includes('register')) {
      if (this.sidenav && this.sidenavContent) {
        this.sidenav.style.display = 'none';
        this.sidenavContent.style.display = 'none';
      }
    } else if (windowWidth > 800) {
      if (this.sidenav && this.sidenavContent) {
        this.sidenav.style.display = 'flex';
        this.sidenavContent.style.display = 'flex';
        this.isCollapsed = false;
      }
    } else {
      if (this.sidenav && this.sidenavContent) {
        this.sidenav.style.display = 'flex';
        this.sidenavContent.style.display = 'none';
        this.isCollapsed = true;
      }
    }
  }
  toggleSidenav(): void {
    if (this.sidenav && this.sidenavContent) {
      const currentDisplay = getComputedStyle(this.sidenav).getPropertyValue('display');
      this.sidenav.style.display = currentDisplay === 'none' ? 'flex' : 'none';
    }
  }

  hasAgileCoachRole(user: any): boolean {
    const userRoles = user.userRoles;
 
    // Check if the "AgileCoach" role is present in the array
    return userRoles && userRoles.some((role: { role: string }) => role.role === 'AgileCoach');
  }

}
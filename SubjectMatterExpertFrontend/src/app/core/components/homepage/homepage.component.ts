import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from '../../services/sidenav-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  cards = [
    { title: 'Profile', imageSrc: '../../../../assets/images/Contract still active 2.png', route: '/profile'},
    { title: 'View SME List', imageSrc: '../../../../../assets/images/Contract still active 2.png' },
    { title: 'Request to be SME', imageSrc: '../../../../../assets/images/Contract still active 2.png' },
    { title: '?', imageSrc: '../../../../../assets/images/Contract still active 2.png' },
    { title: '?', imageSrc: '../../../../../assets/images/Contract still active 2.png' },
    { title: '?', imageSrc: '../../../../../assets/images/Contract still active 2.png' },

  ];

  constructor(private router: Router, private sidenavService : SidenavService, private cdr: ChangeDetectorRef) {}

  navigateTo(route: string | undefined) {
    if (route) {
      this.router.navigate([route]);
    }
  }
  
  onShowSidenav(){
    this.sidenavService.toggleSidenavVisibility();
    this.cdr.detectChanges();
  }
}
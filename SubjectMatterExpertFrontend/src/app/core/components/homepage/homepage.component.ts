import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  // Array of cards with title, image source, and route
  cards = [
    { title: 'Profile', imageSrc: '../../../../assets/images/Contract still active 2.png', route: '/profile'},
    { title: 'View SME List', imageSrc: '../../../../../assets/images/Contract still active 2.png' },
    { title: 'Request to be SME', imageSrc: '../../../../../assets/images/Contract still active 2.png' },
    { title: '?', imageSrc: '../../../../../assets/images/Contract still active 2.png' },
    { title: '?', imageSrc: '../../../../../assets/images/Contract still active 2.png' },
    { title: '?', imageSrc: '../../../../../assets/images/Contract still active 2.png' },

  ];

  // Constructor with Router injection
  constructor(private router: Router) {}

  // Function to navigate to a specified route
  navigateTo(route: string | undefined) {
    if (route) {
      this.router.navigate([route]);
    }
  }
  
}
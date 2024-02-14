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
    { title: 'Profile', imageSrc: '/assets/graphic-abstract/contract.png', route: '/profile'},
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

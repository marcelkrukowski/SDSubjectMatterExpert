import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  isCollapsed: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateSidenavDisplay();
  }

  private sidenav: HTMLElement | null = null;

  ngOnInit(): void {
    this.sidenav = document.querySelector('.sidenav') as HTMLElement;
    this.updateSidenavDisplay();
  }

  private updateSidenavDisplay(): void {
    const windowWidth = window.innerWidth;

    if (windowWidth > 800) {
      if (this.sidenav) {
        this.sidenav.style.display = 'flex';
      }
    } else {
      if (this.sidenav) {
        this.sidenav.style.display = 'none';
      }
    }
  }

  toggleSidenav(): void {
    if (this.sidenav) {
      const currentDisplay = getComputedStyle(this.sidenav).getPropertyValue('display');
      this.sidenav.style.display = currentDisplay === 'none' ? 'flex' : 'none';
    }
  }
}
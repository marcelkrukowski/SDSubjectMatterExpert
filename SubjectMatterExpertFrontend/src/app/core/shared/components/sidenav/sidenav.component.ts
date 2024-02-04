import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { sidenavbarData } from './sidenavdata';
import { SidenavService } from 'src/app/core/services/sidenav-service.service';

interface onSidenavToggle{
  screenSize : number;
  collapsed : boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
  @Output() sidenavToggle: EventEmitter<onSidenavToggle> = new EventEmitter();
  collapsed = false;
  screenSize = 0; //screen width
  sidenavData = sidenavbarData;
  constructor(private sidenavService: SidenavService) {}

  get isSidenavVisible() {
    return this.sidenavService.isSidenavVisible$;
  }
  // @HostListener('window-resize', ['$event'])
  // onResize(event:any){
  //   this.screenSize = window.innerWidth;
  //   if(this.screenSize <= 768) {
  //     this.collapsed = true;
  //     this.sidenavToggle.emit({screenSize : this.screenSize, collapsed: this.collapsed})
  //   }
  // }

  ngOnInit(): void {
    this.screenSize = window.innerWidth;
  }

  toggleCollapsed(): void{
    this.collapsed = !this.collapsed;
    this.sidenavToggle.emit({collapsed : this.collapsed, screenSize : this.screenSize})
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.sidenavToggle.emit({collapsed : this.collapsed, screenSize : this.screenSize})
  }
}

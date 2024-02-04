import { Component } from '@angular/core';

interface onSidenavToggle{
  screenSize : number;
  collapsed : boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SubjectMatterExpertFrontend';

  sidenavCollapsed = false;
  screenSize = 0;
  
  sidenavToggle(data: onSidenavToggle):void{
    this.screenSize = data.screenSize;
    this.sidenavCollapsed = data.collapsed;
  }

  //new line of code

}

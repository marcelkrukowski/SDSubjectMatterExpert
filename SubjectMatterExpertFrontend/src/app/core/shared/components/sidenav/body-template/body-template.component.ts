import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body-template',
  templateUrl: './body-template.component.html',
  styleUrls: ['./body-template.component.scss']
})
export class BodyTemplateComponent {
  @Input() collapsed = false;
  @Input() screenSize = 0;

  getBodyTemplate() : string{
    let dynamicClass = '';
    if(this.collapsed && this.screenSize > 768){
      dynamicClass = 'sidenavOpen';
    }
    else if (this.collapsed && this.screenSize <= 768 && this.screenSize >0){
      dynamicClass = 'sidenavClose';
    }
    return dynamicClass;
  }
}

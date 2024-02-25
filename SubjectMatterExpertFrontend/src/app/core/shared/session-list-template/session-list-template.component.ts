import { Component, Input } from '@angular/core';

@Component({
  selector: 'sdw-card-list-template',
  templateUrl: './session-list-template.component.html',
  styleUrl: './session-list-template.component.scss'
})
export class SessionListTemplateComponent {
  @Input() list : any [] = [];
  @Input() entity : string = '';
  storageService: any
}

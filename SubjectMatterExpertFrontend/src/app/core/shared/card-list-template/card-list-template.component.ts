import { Component, Input } from '@angular/core';

@Component({
  selector: 'sdw-card-list-template',
  templateUrl: './card-list-template.component.html',
  styleUrl: './card-list-template.component.scss'
})
export class CardListTemplateComponent {
  @Input() list : any [] = [];
  @Input() entity : string = '';
  storageService: any
}

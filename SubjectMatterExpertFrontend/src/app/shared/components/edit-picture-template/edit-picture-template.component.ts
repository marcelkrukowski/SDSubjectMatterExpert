import { CommonModule, KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {
  SdwdsHeaderProfileButtonComponent,
  SdwdsHeaderProfileComponent,
  SdwdsHeaderProfileLinkComponent,
  SdwdsHeaderProfileListComponent,
  SdwdsHeaderProfileSelectComponent,
} from '@sdworx/sdwds/header-profile';

@Component({
  selector: 'app-edit-picture-template',
  standalone: true,
  imports: [
    CommonModule,
    SdwdsHeaderProfileComponent,
    SdwdsHeaderProfileButtonComponent,
    SdwdsHeaderProfileLinkComponent,
    SdwdsHeaderProfileSelectComponent,
    SdwdsHeaderProfileListComponent,
    NgbDropdownModule,
  ],
  templateUrl: './edit-picture-template.component.html',
  styleUrl: './edit-picture-template.component.scss'
})
export class EditPictureTemplateComponent {
  imgBase64 =
  './assets/graphic-abstract/Illustrations_Man_Laptop.png'
  editImage() {
    alert('Edit image');
  }
}
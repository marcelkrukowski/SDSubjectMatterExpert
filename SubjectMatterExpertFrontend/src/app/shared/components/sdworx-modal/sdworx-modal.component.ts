import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalModule, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SdwdsModalService } from '@sdworx/sdwds/modal';
import { ProfilePageComponent } from 'src/app/core/components/profile-page/profile-page.component';

@Component({
  selector: 'app-sdworx-modal',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  templateUrl: './sdworx-modal.component.html',
  styleUrl: './sdworx-modal.component.scss'
})
export class SdworxModalComponent implements OnInit{
  @Input() item: any;

  constructor(private sdwdsModalService: SdwdsModalService) {}

  ngOnInit(): void {
    console.log("Item: ",this.item);
  }

  openModalFunctional(type: string, item: any): void {
    const config = {item: item};
    const options: NgbModalOptions = {};
    switch (type) {
      case 'info':
        options.modalDialogClass = 'modal-info';
        break;
    }
    this.sdwdsModalService.show(ModalDemoFunctionalComponent, config, options).subscribe();
  }

  
}

@Component({
  selector: 'sdwds-docs-modal-demo-functional',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./sdworx-modal.component.scss'],
  template: `
  <div class="modal-style">
  <div class="modal-header">
  
    <h5 class="modal-title">{{item?.name}}</h5>
    <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
  </div>
  <div class="modal-body">
  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sam" alt="{{ item.userName }} Avatar"
  class="sme-avatar">
    <!-- <img [src]="item?.image_car" alt="{{item?.name}}" class="w-75 card-img-top"> -->
    <p>First Name: {{item?.firstname}}</p>
    <p>Lastname: {{item?.lastname}}</p>
    <p>Email: {{item?.email}}</p>
    <p>Location: {{item?.location}}</p>
    <p>Languages:</p>
    
  </div>
</div>
`,
})
export class ModalDemoFunctionalComponent {
  @Input() item: any;
  constructor(public activeModal: NgbActiveModal) {}
}


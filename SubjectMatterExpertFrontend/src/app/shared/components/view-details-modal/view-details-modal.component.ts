import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalModule, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SdwdsModalService } from '@sdworx/sdwds/modal';
import { ProfilePageComponent } from 'src/app/core/components/profile-page/profile-page.component';

@Component({
  selector: 'app-sdworx-modal',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  templateUrl: './view-details-modal.component.html',
  styleUrl: './view-details-modal.component.scss'
})
export class ViewDetailsModalComponent implements OnInit{
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
  styleUrls: ['./view-details-modal.component.scss'],
  template: `
  <div class="modal-style">
      <div class="modal-header">
          <h5 class="modal-title">{{item?.name}}</h5>
          <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
      </div>

        <div class="modal-body">
        <div class="modal-photo">
          <img src={{item?.photo?.uri}} alt="{{ item?.userName }} Avatar" class="sme-avatar">
        </div>
        <div class="user-details">
          <p><span class="label">First Name:</span> <span class="first-name">{{item?.firstname}}</span></p>
          <p><span class="label">Last Name:</span> <span class="last-name">{{item?.lastname}}</span></p>
          <p><span class="label">Email: </span> {{item?.email}}</p>
          <p><span class="label">Location: </span> {{item?.location}}</p>
          <p><span class="label">Languages:</span>
            <ng-container *ngFor="let language of item.languages; let last = last">
              {{ language.languageName }}{{ !last ? ', ' : '' }}
            </ng-container>
          </p>
          <p><span class="label">Requesting to be SME in:</span>
            <ng-container *ngFor="let exp of item.areasOfExpertise; let last = last">
              {{ exp.expertiseArea }}{{ !last ? ', ' : '' }}
            </ng-container>
          </p>
        </div>

        
      </div>
    

      <div class="modal-footer">
        <button type="button" class="btn" (click)="activeModal.dismiss()">Close</button>
      </div>
`,
})
export class ModalDemoFunctionalComponent {
  @Input() item: any;
  constructor(public activeModal: NgbActiveModal) {}
}


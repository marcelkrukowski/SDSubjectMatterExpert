import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-display-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-details-modal.component.html',
  styleUrl: './display-details-modal.component.scss'
})
export class DisplayDetailsModalComponent implements OnInit{
  modalRef : BsModalRef = new BsModalRef() ;
  @Input() item: any ;
 
  constructor(private modalService : BsModalService){}
  ngOnInit(): void {
    console.log("Item: ",this.item);
  }
 
  openModal(template : TemplateRef<any>){
    this.modalRef = this.modalService.show(template) ;
  }
 
  closeModal(){
    this.modalRef.hide();
  }

}

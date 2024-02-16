import { Component, HostListener, OnInit } from '@angular/core';
import { RequestToBeSMEList } from './sme.model';

@Component({
  selector: 'app-request-to-be-sme-list',
  templateUrl: './request-to-be-sme-list.component.html',
  styleUrl: './request-to-be-sme-list.component.scss'
})
export class RequestToBeSmeListComponent implements OnInit {
  requestToBesmeList: RequestToBeSMEList[] = [
    { name: 'Henish Nobeen', title: 'Associate Engineer', expertise: '.net, angular JS'},
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
  ];

  paginatedSmeList: RequestToBeSMEList[] = [];
  currentPage = 0;
  pageSize = 3; // Initial value, adjustable based on screen size
  totalPages = 0;
  isPaginationEnabled = true;
  isMobile: boolean;
  sidebarVisible: boolean;

  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.sidebarVisible = !this.isMobile;
  }

  ngOnInit() {
    this.adjustPageSize();
    this.adjustPagination();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth <= 768;
    this.sidebarVisible = !this.isMobile;
    this.adjustPageSize();
    this.adjustPagination();
  }

  adjustPageSize() {
    const viewportHeight = window.innerHeight;
    this.pageSize = this.isMobile ? this.requestToBesmeList.length : Math.floor(viewportHeight / 280); // 280 is item height
    this.isPaginationEnabled = this.pageSize < this.requestToBesmeList.length;
  }

  adjustPagination() {
    this.totalPages = Math.ceil(this.requestToBesmeList.length / this.pageSize);
    this.currentPage = Math.max(0, Math.min(this.currentPage, this.totalPages - 1));
    this.paginate();
  }

  paginate() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedSmeList = this.requestToBesmeList.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.paginate();
    }
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}




import { Component, OnInit, HostListener } from '@angular/core';
import { SME } from './sme.model';
import {SmeListService} from "./sme-list.service";

@Component({
  selector: 'app-sme-list',
  templateUrl: './sme-list.component.html',
  styleUrls: ['./sme-list.component.scss']
})
export class SmeListComponent implements OnInit {
  smeList: SME[] = [];
  selectedMovie = 1;

  movies = [
    { id: 1, name: 'Pulp Fiction' },
    { id: 2, name: 'Reservoir Dogs' },
    { id: 3, name: 'Django Unchained' },
    { id: 4, name: 'Jackie Brown' },
  ];

  paginatedSmeList: SME[] = [];
  currentPage = 0;
  pageSize = 3;
  totalPages = 0;
  isPaginationEnabled = true;
  isMobile: boolean;
  isLoading: boolean = true;
  sidebarVisible: boolean;

  constructor(private smeListService: SmeListService) {
    this.isMobile = window.innerWidth <= 768;
    this.sidebarVisible = !this.isMobile;
  }

  ngOnInit() {
    this.isLoading = true;
    this.smeListService.getSme().subscribe((data: SME[]) => {
      this.smeList = data;
      this.adjustPageSize();
      this.adjustPagination();
      this.isLoading = false;
    });
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
    this.pageSize = this.isMobile ? this.smeList.length : Math.floor(viewportHeight / 280); // 280 is item height
    this.isPaginationEnabled = this.pageSize < this.smeList.length;
  }

  adjustPagination() {
    this.totalPages = Math.ceil(this.smeList.length / this.pageSize);
    this.currentPage = Math.max(0, Math.min(this.currentPage, this.totalPages - 1));
    this.paginate();
  }

  paginate() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedSmeList = this.smeList.slice(startIndex, endIndex);
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

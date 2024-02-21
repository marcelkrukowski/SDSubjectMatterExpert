import { Component, HostListener, OnInit } from '@angular/core';
// import { RequestToBeSMEList } from './sme.model';
import { UserDetailsService } from '../../services/user-details.service';
import { Observable } from 'rxjs';
import { PendingSmeRequestService } from '../../services/pending-sme-request.service';
import { RequestToBeSMEList } from './requestToBeSme.model';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-to-be-sme-list',
  templateUrl: './request-to-be-sme-list.component.html',
  styleUrl: './request-to-be-sme-list.component.scss'
})
export class RequestToBeSmeListComponent implements OnInit {

  pendingSmeRequest$!: Observable<any>;

  requestToBesmeList: RequestToBeSMEList[] = [
    // { name: 'Henish Nobeen', title: 'Associate Engineer', expertise: '.net, angular JS'},
    // { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    // { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    // { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    // { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    // { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    // { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    // { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    // { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    // { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
    // { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS'},
  ];


  paginatedSmeList: RequestToBeSMEList[] = [];
  currentPage = 0;
  pageSize = 3; // Initial value, adjustable based on screen size
  totalPages = 0;
  isPaginationEnabled = true;
  isMobile: boolean;
  sidebarVisible: boolean;

  constructor(private apiService: ApiService, private pendingSmeRequestService: PendingSmeRequestService, private router: Router) {
    this.isMobile = window.innerWidth <= 768;
    this.sidebarVisible = !this.isMobile;
  }

  ngOnInit() {
    this.adjustPageSize();
    this.adjustPagination();

    this.pendingSmeRequest$ = this.pendingSmeRequestService.getPendingSmeRequest();
    this.pendingSmeRequest$.subscribe(e => console.log(e));
    this.pendingSmeRequest$.subscribe((data: any[]) => {
      if (data && data.length > 0) { // Check if data is not empty
        const requestId = data[0].requestId;
        console.log("Request ID:", requestId);
        // Proceed with further processing using the requestId...
      } else {
        console.log("Pending Sme List is empty");
        // Handle the case where there is no data or data is empty...
      }
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




  Save(requestId: any) {
    console.log("Accepting request with ID:", requestId);
    this.apiService.request('acceptRequestToBeSme', 'post', undefined, requestId).subscribe();
  }

  Reject(requestId: any) {
    console.log("Rejecting request with ID:", requestId);
    this.apiService.request('declineRequestToBeSme', 'post', undefined, requestId).subscribe();
  }

  Accept(requestId: any) {
    Swal.fire('Success', 'Request accepted successfully', 'success').then(swalResult => {
      console.log("SwalResult:", swalResult);
    }).then((result) => {
      this.Save(requestId);
      this.router.navigate(['/request-to-be-sme']);

    });
  }

  Decline(requestId: any) {
    Swal.fire('Success', 'Request declined successfullt', 'success').then(swalResult => {
      console.log("SwalResult:", swalResult);
    }).then((result) => {
      this.Reject(requestId);
      this.router.navigate(['/request-to-be-sme']);

    });

  }

}





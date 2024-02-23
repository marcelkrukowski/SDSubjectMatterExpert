import { Component, HostListener, OnInit } from '@angular/core';
// import { RequestToBeSMEList } from './sme.model';
import { UserDetailsService } from '../../services/user-details.service';
import { BehaviorSubject, Observable, combineLatest, map, of } from 'rxjs';
import { PendingSmeRequestService } from '../../services/pending-sme-request.service';
import { RequestToBeSMEList } from '../../../../models/requestToBeSmeList.model';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-to-be-sme-list',
  templateUrl: './request-to-be-sme-list.component.html',
  styleUrl: './request-to-be-sme-list.component.scss'
})
export class RequestToBeSmeListComponent implements OnInit {

  pendingSmeRequest$: Observable<RequestToBeSMEList[]> = of([]);




  paginatedSmeList$: Observable<RequestToBeSMEList[]> = new Observable<RequestToBeSMEList[]>();
  filteredPendingRequest$: Observable<RequestToBeSMEList[]> = of([]);


  currentPage = new BehaviorSubject<number>(0);
  pageSize = 3; // Initial value, adjustable based on screen size
  totalPages = 0;
  totalItems = 0;
  itemsPerPage = 3;
  isPaginationEnabled = true;
  isMobile: boolean;
  sidebarVisible: boolean;
  private readonly smeCardHeight: number = 200;


  constructor(private apiService: ApiService, private pendingSmeRequestService: PendingSmeRequestService, private router: Router) {
    this.isMobile = window.innerWidth <= 768;
    this.sidebarVisible = !this.isMobile;
  }

  ngOnInit() {


    this.pendingSmeRequest$ = this.pendingSmeRequestService.getPendingSmeRequest();
    this.pendingSmeRequest$.subscribe(pendingRequests => {
      console.log("Pending requests:", pendingRequests);
  });
    
    this.initializeFilteredSmeList();
    this.updatePagination();


  }

  initializeFilteredSmeList(): void {
    this.filteredPendingRequest$ = combineLatest([
      this.pendingSmeRequest$,
      this.currentPage.asObservable() // Make currentPage part of the reactive stream
    ]).pipe(
      map(([smes, page]) => {
        // Calculate pagination-related values
        this.totalItems = smes.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  
        // Check if the current page is out of range
        if (this.currentPage.value > this.totalPages - 1) {
          this.currentPage.next(this.totalPages - 1);
        } else if (this.currentPage.value < 0) {
          this.currentPage.next(0);
        }
  
        // Calculate the slice of items to be displayed based on the current page
        const startIndex = page * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return smes.slice(startIndex, endIndex);
      })
    );
  }

  updatePagination(): void {
    this.filteredPendingRequest$.subscribe(smes => {
      this.totalItems = smes.length;
      this.calculateItemsPerPage();
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.paginateSmeList();
    });
  }

  calculateItemsPerPage(): void {
    const viewportHeight = window.innerHeight;
    const headerHeight = 150; // Adjust as necessary
    const availableHeight = viewportHeight - headerHeight;
    this.itemsPerPage = Math.max(1, Math.floor(availableHeight / this.smeCardHeight));
  }

  paginateSmeList(): void {
    this.paginatedSmeList$ = this.filteredPendingRequest$.pipe(
      map(smes => smes.slice(this.currentPage.value * this.itemsPerPage, (this.currentPage.value + 1) * this.itemsPerPage))
    );
  }




  nextPage(): void {
    const nextPage = this.currentPage.value + 1;
    if (nextPage < this.totalPages) {
      this.currentPage.next(nextPage);
    }
  }
  previousPage(): void {
    const previousPage = this.currentPage.value - 1;
    if (previousPage >= 0) {
      this.currentPage.next(previousPage);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calculateItemsPerPage();
    // Instead of calling updatePagination, we emit the current page to recalculate the items per page
    this.currentPage.next(this.currentPage.value);
  }





  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }




  Save(requestId: number) {
    console.log("Accepting request with ID:", requestId);
    this.apiService.request('acceptRequestToBeSme', 'post', undefined, requestId).subscribe();
  }

  Reject(requestId: number) {
    console.log("Rejecting request with ID:", requestId);
    this.apiService.request('declineRequestToBeSme', 'post', undefined, requestId).subscribe();
  }

  Accept(requestId: number) {
    Swal.fire('Success', 'Request accepted successfully', 'success').then(swalResult => {
      console.log("SwalResult:", swalResult);
    }).then((result) => {
      this.Save(requestId);
      window.location.reload(); // Reload the page

    });
  }

  Decline(requestId: number) {
    Swal.fire('Success', 'Request declined successfullt', 'success').then(swalResult => {
      console.log("SwalResult:", swalResult);
    }).then((result) => {
      this.Reject(requestId);
      window.location.reload(); // Reload the page

    });

  }

}





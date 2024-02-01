import { Component, HostListener, OnInit } from '@angular/core';
import { SME } from './sme.model';

@Component({
  selector: 'app-sme-list',
  templateUrl: './sme-list.component.html',
  styleUrls: ['./sme-list.component.scss']
})
export class SmeListComponent implements OnInit {
  smeList: SME[] = [
    {
      name: 'Henish Nobeen',
      title: 'Associate Engineer',
      expertise: '.net, angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
  ];

  selectedMovie = 1;

  movies = [
    { id: 1, name: 'Pulp Fiction' },
    { id: 2, name: 'Reservoir Dogs'},
    { id: 3, name: 'Django Unchained' },
    { id: 4, name: 'Jackie Brown' },
  ];

  paginatedSmeList: SME[] = [];
  currentPage = 0;
  pageSize = 3; // Initial value, will be recalculated
  totalPages = 0;
  itemHeight = 280; // Height of each item in pixels
  isPaginationEnabled = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustPageSize();
    this.adjustPagination();
  }

  ngOnInit() {
    this.adjustPageSize();
    this.adjustPagination();
  }

  adjustPageSize() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (viewportWidth < 768) {
      this.isPaginationEnabled = false;
      this.pageSize = this.smeList.length; // Set pageSize to full list length
    } else {
      this.pageSize = Math.floor(viewportHeight / this.itemHeight);
      this.isPaginationEnabled = this.pageSize < this.smeList.length;
    }
  }

  adjustPagination() {
    this.totalPages = Math.ceil(this.smeList.length / this.pageSize);

    if (this.currentPage >= this.totalPages) {
      this.currentPage = Math.max(this.totalPages - 1, 0);
    }

    if (this.isPaginationEnabled) {
      this.paginate();
    } else {
      this.paginatedSmeList = this.smeList; // Show all items if pagination is disabled
    }
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
}

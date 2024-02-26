import {Component, HostListener, OnInit} from '@angular/core';
import { SME } from '../../../../models/sme.model';
import {BehaviorSubject, combineLatest, Observable, of} from "rxjs";
import { map } from "rxjs/operators";
import { SmeListService } from "../../services/sme-list.service";

@Component({
  selector: 'app-sme-list',
  templateUrl: './sme-list.component.html',
  styleUrls: ['./sme-list.component.scss']
})
export class SmeListComponent implements OnInit {
  smeList$: Observable<SME[]> = of([]);
  selectedCountry = new BehaviorSubject<string | undefined>(undefined);
  selectedExpertise = new BehaviorSubject<string | undefined>(undefined);
  filteredSmeList$: Observable<SME[]> = of([]);
  searchQuery: string = '';
  selectedSearchQuery = new BehaviorSubject<string>('');
  countries: string[] = [];
  expertiseFields: string[] = [];
  paginatedSmeList$: Observable<SME[]> = new Observable<SME[]>();
  currentPage = new BehaviorSubject<number>(0);
  itemsPerPage = 3; // Fixed items per page
  totalItems = 0;
  totalPages = 0;
  private readonly smeCardHeight: number = 200;

  constructor(private smeListService: SmeListService) {}

  ngOnInit(): void {
    this.smeList$ = this.smeListService.getSmes();
    this.initializeFilteredSmeList();
    this.extractUniqueCountriesAndExpertise();
    this.updatePagination();
  }

  initializeFilteredSmeList(): void {
    // Use combineLatest to react to changes in filtering or page changes
    this.filteredSmeList$ = combineLatest([
      this.smeList$,
      this.selectedCountry,
      this.selectedExpertise,
      this.selectedSearchQuery,
      this.currentPage.asObservable() // Make currentPage part of the reactive stream
    ]).pipe(
      map(([smes, country, expertise, searchQuery, page]) => {
        const filtered = smes.filter(sme =>
          (!country || sme.location === country) &&
          (!expertise || sme.areasOfExpertise?.some(exp => exp.expertiseArea?.toLowerCase().includes(expertise.toLowerCase()))) &&
          (!searchQuery || sme.userName?.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        this.totalItems = filtered.length;
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
        return filtered.slice(startIndex, endIndex);
      })
    );
  }

  private extractUniqueCountriesAndExpertise(): void {
    this.smeList$.subscribe(smes => {
      const countrySet = new Set<string>();
      const expertiseSet = new Set<string>();

      smes.forEach(sme => {
        if (sme.location) countrySet.add(sme.location);
        sme.areasOfExpertise?.forEach(expertise => {
          if (expertise.expertiseArea) expertiseSet.add(expertise.expertiseArea);
        });
      });

      this.countries = Array.from(countrySet);
      this.expertiseFields = Array.from(expertiseSet);
    });
  }

  onCountrySelected(country: string): void {
    this.selectedCountry.next(country || undefined);
  }

  onExpertiseSelected(expertise: string): void {
    this.selectedExpertise.next(expertise || undefined);
  }

  onSearchQueryChanged(): void {
    this.selectedSearchQuery.next(this.searchQuery);
  }

  updatePagination(): void {
    this.filteredSmeList$.subscribe(smes => {
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
    this.paginatedSmeList$ = this.filteredSmeList$.pipe(
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
}


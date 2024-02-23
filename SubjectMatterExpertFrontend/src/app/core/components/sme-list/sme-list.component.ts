import { Component, OnInit, HostListener } from '@angular/core';
import { SME } from '../../../../models/sme.model';
import {BehaviorSubject, combineLatest, map, Observable, Subscription, tap} from "rxjs";
import {SmeListService} from "../../services/sme-list.service";

@Component({
  selector: 'app-sme-list',
  templateUrl: './sme-list.component.html',
  styleUrls: ['./sme-list.component.scss']
})
export class SmeListComponent implements OnInit {
  smeList$!: Observable<SME[]>;
  selectedCountry = new BehaviorSubject<string | undefined>(undefined);
  selectedExpertise = new BehaviorSubject<string | undefined>(undefined);

  searchQuery: string = '';
  selectedSearchQuery = new BehaviorSubject<string>('');
  countries!: string[];
  expertiseFields!: string[];

  filteredSmeList$ = combineLatest([
    this.smeList$,
    this.selectedCountry,
    this.selectedExpertise,
    this.selectedSearchQuery // Include the new search query BehaviorSubject
  ]).pipe(
    map(([smes, country, expertise, searchQuery]) =>
      smes.filter(sme =>
        (country ? sme.location === country : true) &&
        (expertise ? sme.areaOfExpertise.includes(expertise) : true) &&
        (searchQuery ? sme.username.toLowerCase().includes(searchQuery.toLowerCase()) : true) // Filter by name
      )
    )
  );

  ngOnInit() {
    this.smeList$ = this.smeListService.getSmes();
    this.extractUniqueCountriesAndExpertise();
  }

  constructor(private smeListService: SmeListService) { }

  private subscription: Subscription = new Subscription();
  private extractUniqueCountriesAndExpertise() {
    // Ensure we don't create a memory leak by unsubscribing from any previous subscription
    this.subscription.unsubscribe();

    this.subscription = this.smeList$.subscribe(smes => {
      const countrySet = new Set<string>();
      const expertiseSet = new Set<string>();

      smes.forEach(sme => {
        if (sme.location) { // Assuming 'location' in your SME model is equivalent to 'country'
          countrySet.add(sme.location);
        }
        if (sme.areaOfExpertise) { // Assuming 'areaOfExpertise' can be split similarly to 'expertise' in the initial model
          // If areaOfExpertise is a string similar to 'expertise' in the initial model
          sme.areaOfExpertise.split(', ').forEach(expertise => expertiseSet.add(expertise));
        }
      });

      this.countries = Array.from(countrySet);
      this.expertiseFields = Array.from(expertiseSet);
    });
  }

  onCountrySelected(country: string) {
    this.selectedCountry.next(country || undefined);
  }

  onExpertiseSelected(expertise: string) {
    this.selectedExpertise.next(expertise || undefined);
  }
  onSearchQueryChanged() {
    this.selectedSearchQuery.next(this.searchQuery);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

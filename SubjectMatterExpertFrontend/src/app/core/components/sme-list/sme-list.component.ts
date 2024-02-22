import { Component, OnInit, HostListener } from '@angular/core';
import { SME } from '../../../../models/sme.model';
import {BehaviorSubject, combineLatest, map} from "rxjs";

@Component({
  selector: 'app-sme-list',
  templateUrl: './sme-list.component.html',
  styleUrls: ['./sme-list.component.scss']
})
export class SmeListComponent implements OnInit {
  initialSmeList: SME[] = [
    { name: 'Henish Nobeen', title: 'Associate Engineer', expertise: '.net, angular JS', availability: 'Available', country: 'Mauritius' },
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS', availability: 'Available', country: 'Mauritius' },
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS', availability: 'Available', country: 'Mauritius' },
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS', availability: 'Available', country: 'Mauritius' },
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS', availability: 'Available', country: 'Poland' },
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS', availability: 'Available', country: 'Poland' },
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS', availability: 'Available', country: 'Poland' },
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS', availability: 'Available', country: 'Poland' },
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS', availability: 'Available', country: 'Poland' },
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS', availability: 'Available', country: 'Poland' },
    { name: 'Jacek Nowak', title: 'Pro Engineer', expertise: 'angular JS', availability: 'Available', country: 'Poland' },
  ];

  selectedCountry = new BehaviorSubject<string | undefined>(undefined);
  selectedExpertise = new BehaviorSubject<string | undefined>(undefined);
  smeList$ = new BehaviorSubject<SME[]>(this.initialSmeList);

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
        (country ? sme.country === country : true) &&
        (expertise ? sme.expertise.includes(expertise) : true) &&
        (searchQuery ? sme.name.toLowerCase().includes(searchQuery.toLowerCase()) : true) // Filter by name
      )
    )
  );

  ngOnInit() {
    this.extractUniqueCountriesAndExpertise();
  }
  private extractUniqueCountriesAndExpertise() {
    const countrySet = new Set<string>();
    const expertiseSet = new Set<string>();

    this.initialSmeList.forEach(sme => {
      countrySet.add(sme.country);
      sme.expertise.split(', ').forEach(expertise => expertiseSet.add(expertise));
    });

    this.countries = Array.from(countrySet);
    this.expertiseFields = Array.from(expertiseSet);
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
}

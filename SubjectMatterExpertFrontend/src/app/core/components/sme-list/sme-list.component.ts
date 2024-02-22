import { Component, OnInit } from '@angular/core';
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

  constructor(private smeListService: SmeListService) {}

  ngOnInit(): void {
    this.smeList$ = this.smeListService.getSmes();
    this.initializeFilteredSmeList();
    this.extractUniqueCountriesAndExpertise();
  }

  initializeFilteredSmeList(): void {
    this.filteredSmeList$ = combineLatest([
      this.smeList$,
      this.selectedCountry,
      this.selectedExpertise,
      this.selectedSearchQuery
    ]).pipe(
      map(([smes, country, expertise, searchQuery]) => smes.filter(sme =>
        (!country || sme.location === country) &&
        (!expertise || sme.areaOfExpertise?.some(exp => exp.expertiseArea?.toLowerCase().includes(expertise.toLowerCase()))) &&
        (!searchQuery || sme.userName?.toLowerCase().includes(searchQuery.toLowerCase()))
      ))
    );
  }

  private extractUniqueCountriesAndExpertise(): void {
    this.smeList$.subscribe(smes => {
      const countrySet = new Set<string>();
      const expertiseSet = new Set<string>();

      smes.forEach(sme => {
        if (sme.location) countrySet.add(sme.location);
        sme.areaOfExpertise?.forEach(expertise => {
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

}

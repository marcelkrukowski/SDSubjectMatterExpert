import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private isSidenavVisibleSubject = new BehaviorSubject<boolean>(true);
  isSidenavVisible$ = this.isSidenavVisibleSubject.asObservable();

  toggleSidenavVisibility() {
    this.isSidenavVisibleSubject.next(!this.isSidenavVisibleSubject.value);
  }
}

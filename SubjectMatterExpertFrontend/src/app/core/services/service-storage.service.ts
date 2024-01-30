import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceStorageService {

  constructor() { }

  set(key : string, value : any){
    if (!value) return;
    const val = JSON.stringify(value);
    localStorage.setItem(key,val);
  }
 
  get(key : string){
    const stringValue : string | null = localStorage.getItem(key);
    if (stringValue) return JSON.parse(stringValue);
  }
}

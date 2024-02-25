import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionFormService {

  baseURL = 'http://localhost:7072/'

  constructor(private http : HttpClient){}

  getCurrentSession(){
    return this.http.get(`${this.baseURL}api/Session/user-sessions-details`);    
  }
}

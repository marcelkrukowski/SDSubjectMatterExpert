import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class apiService {
  baseURL = 'http://localhost:7072/'

  constructor(private http: HttpClient) { }

  endpoints: { [endpoint: string]: string | any } = {
    login : `${this.baseURL}api/Account/login`,
    profile : `${this.baseURL}api/Users`,
    currentProfile : (id : number) => `${this.baseURL}api/Users/${id}`,
    editProfile : (id : number) => `${this.baseURL}api/Account/${id}`,

  }


  request(url : endpointType, method : string , payload? : object , urlParams? : any){
    const finalURL = !urlParams ? this.endpoints[url] : this.endpoints[url](urlParams);
    return !payload
    ? this.http.request(method, finalURL)
    : this.http.request(method, finalURL , { body:payload });
  }
}

export type endpointType = 'login' |'profile' | 'currentProfile' | 'editProfile';

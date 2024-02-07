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
    profile2 : (id : number) => `${this.baseURL}api/Users/${id}`,
    profile3 : (id : number) => `${this.baseURL}api/Account/${id}`,
    editProfile : (slug : string) => `${this.baseURL}profile/edit/${slug}`,

  }


  request(url : endpointType, method : string , payload? : object , urlParams? : any){
    const finalURL = !urlParams ? this.endpoints[url] : this.endpoints[url](urlParams);
    return !payload
    ? this.http.request(method, finalURL)
    : this.http.request(method, finalURL , { body:payload });
  }
}

export type endpointType = 'login' |'profile' | 'profile2' | 'profile3' | 'editProfile';

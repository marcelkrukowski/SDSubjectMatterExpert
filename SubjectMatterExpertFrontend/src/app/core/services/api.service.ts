import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  endpoints: { [endpoint: string]: string | any } = {
    login : `${environment.apiUrl}/api/Account/login`,
    profile : `${environment.apiUrl}/api/Users`,
    currentProfile : (id : number) => `${environment.apiUrl}/api/Users/${id}`,
    editProfile : (id : number) => `${environment.apiUrl}/api/Account/${id}`,
    createRequestToBeSme : `${environment.apiUrl}/api/Request/create-request`,
    pendingRequestToBeSme : `${environment.apiUrl}/api/Request/user-request-details`,
  }

  request(url : endpointType, method : string , payload? : object , urlParams? : any){
    const finalURL = !urlParams ? this.endpoints[url] : this.endpoints[url](urlParams);
    return !payload
    ? this.http.request(method, finalURL)
    : this.http.request(method, finalURL , { body:payload });
  }
}

export type endpointType = 'login' |'profile' | 'currentProfile' | 'editProfile' |  'createRequestToBeSme' | 'pendingRequestToBeSme';

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
    mostContactedSME : `${environment.apiUrl}/api/Session/most-contacted-smes`,
    mostContactedAreas : `${environment.apiUrl}/api/Session/most-contacted-areas`,
    editProfile : `${environment.apiUrl}/api/Account/update-user-details`,
    createRequestToBeSme : `${environment.apiUrl}/api/Request/create-request`,
    viewUserRequestDetails : (username : string) => `${environment.apiUrl}/api/Users/username-details/${username}`,
    acceptRequestToBeSme : (requestId : number) => `${environment.apiUrl}/api/Request/accept-request/${requestId}`,
    declineRequestToBeSme : (requestId : number) => `${environment.apiUrl}/api/Request/decline-request/${requestId}`,
  }

  request(url : endpointType, method : string , payload? : object , urlParams? : any){
    const finalURL = !urlParams ? this.endpoints[url] : this.endpoints[url](urlParams);
    return !payload
    ? this.http.request(method, finalURL)
    : this.http.request(method, finalURL , { body:payload });
  }
}

export type endpointType = 'login' |'profile' | 'currentProfile' | 'editProfile' | 'mostContactedSME' | 'mostContactedAreas'|  'createRequestToBeSme' | 'pendingRequestToBeSme' | 'viewUserRequestDetails' |'acceptRequestToBeSme' | 'declineRequestToBeSme';

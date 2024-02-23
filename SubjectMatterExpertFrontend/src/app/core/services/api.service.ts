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
    createSession : `${environment.apiUrl}/api/Session/create-session`,
    sessionList : `${environment.apiUrl}/api/Session/user-sessions-details`,
    editSession : `${environment.apiUrl}/api/Session/update-session`,
    mostContactedSME : `${environment.apiUrl}/api/Session/most-contacted-smes`,
    mostContactedAreas : `${environment.apiUrl}/api/Session/most-contacted-areas`,
  }

  request(url : endpointType, method : string , payload? : object , urlParams? : any){
    const finalURL = !urlParams ? this.endpoints[url] : this.endpoints[url](urlParams);
    return !payload
    ? this.http.request(method, finalURL)
    : this.http.request(method, finalURL , { body:payload });
  }
}

export type endpointType = 'login' |'profile' | 'currentProfile' | 'editProfile' | 'createSession' | 'sessionList' | 'editSession' | 'mostContactedSME' | 'mostContactedAreas';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  constructor(private http: HttpClient) { }

  endpoints: { [endpoint: string]: string | any } = {
   
  }


}

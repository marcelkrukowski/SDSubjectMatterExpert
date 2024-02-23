import { Injectable } from '@angular/core';
import {SME} from "./sme.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SmeListService {
  private getHeaders(): HttpHeaders {
    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJleGFtcGxldXNlciIsIm5iZiI6MTcwNzQ2OTQ3NywiZXhwIjoxNzA4MDc0Mjc3LCJpYXQiOjE3MDc0Njk0Nzd9.b5DGCtZDSseMJhMmW2UqZ1Q9GDEIgsiu2UEUSbfKq-y-hriSy3YfiETpl8r2XH3Gxhgc5T6Xmz1t-ReuazAKjQ';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  // TODO: move API URL to global variable
  getSme(): Observable<any> {
    return this.http.get('http://localhost:7072/api/Users/smes', { headers: this.getHeaders() });
  }
  constructor(private http: HttpClient) {

  }
}

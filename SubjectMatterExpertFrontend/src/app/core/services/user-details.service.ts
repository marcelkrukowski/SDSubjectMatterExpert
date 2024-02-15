import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private apiUrl = `${environment.apiUrl}/api/Users/user-details`;

  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }
}

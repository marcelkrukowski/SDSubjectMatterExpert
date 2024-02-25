import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ViewUserRequestDetailsService {
  private apiUrl = `${environment.apiUrl}/api/Users/username-details`;

  constructor(private http: HttpClient) { }

  getUserDetailsByUsername(username: string): Observable<User> {
    const url = `${this.apiUrl}/${username}`;
    return this.http.get<User>(url);
  }
}

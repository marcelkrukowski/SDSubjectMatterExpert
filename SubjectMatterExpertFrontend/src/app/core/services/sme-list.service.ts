import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SME} from "../../../models/sme.model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SmeListService {

  private apiUrl = `${environment.apiUrl}/api/Users`;

  constructor(private http: HttpClient) { }

  getSmes(): Observable<SME[]> {
    return this.http.get<SME[]>(this.apiUrl);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PendingSmeRequestService {
  private apiUrl = `${environment.apiUrl}/api/Request/pending-requests-for-sme`;

  constructor(private http: HttpClient) { }

  getPendingSmeRequest(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}






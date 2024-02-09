import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceStorageService } from '../services/service-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private serviceStorage: ServiceStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.serviceStorage.get('token');
    if(token){
      console.log("Token in interceptor: ", token);  
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })   
    }

    return next.handle(request);
  }
}

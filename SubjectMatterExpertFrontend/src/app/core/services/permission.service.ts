import { Injectable } from '@angular/core';
import { ServiceStorageService } from './service-storage.service';
 
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
 
  constructor(private storageService: ServiceStorageService) { }
  hasRole(roles : string []){
    const userStorageObject = this.storageService.get('user');
    if(userStorageObject) return roles.includes(userStorageObject.role);
    else return false;
  }
}
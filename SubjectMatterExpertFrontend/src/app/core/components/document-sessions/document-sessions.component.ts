import { Component, OnInit } from '@angular/core';
import { SessionDetails } from '../../../models/session-details';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-document-sessions',
  templateUrl: './document-sessions.component.html',
  styleUrl: './document-sessions.component.scss'
})
export class DocumentSessionsComponent implements OnInit{
  sessionList : SessionDetails[] = [];
  sessionDetailList : SessionDetails[] = [];

  constructor(
    private storageService: StorageService,
    private apiService: ApiService
  ) { }
  ngOnInit(): void {
    console.log("Inside Session Components");
    this.getSessionList();
  }

  getSessionList(){
    this.apiService.request('sessionList', 'get').subscribe((sessions: any) => {
      console.log("Sessions: ", sessions);
      this.sessionList = sessions;
      this.sessionDetailList = this.sessionList;
      console.log("Session List: ", this.sessionList)
    })
  }
}


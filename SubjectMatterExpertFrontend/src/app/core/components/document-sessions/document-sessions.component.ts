import { Component } from '@angular/core';
import { SessionDetails } from '../../../models/session-details';

@Component({
  selector: 'app-document-sessions',
  templateUrl: './document-sessions.component.html',
  styleUrl: './document-sessions.component.scss'
})
export class DocumentSessionsComponent {
  sessionDetailList : SessionDetails[] = [];
}


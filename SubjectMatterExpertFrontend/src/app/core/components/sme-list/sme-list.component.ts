import { Component, OnInit } from '@angular/core';
import { SME } from './sme.model';

@Component({
  selector: 'app-sme-list',
  templateUrl: './sme-list.component.html',
  styleUrls: ['./sme-list.component.scss']
})
export class SmeListComponent implements OnInit {
  smeList: SME[] = [
    {
      name: 'Henish Nobeen',
      title: 'Associate Engineer',
      expertise: '.net, angular JS',
      availability: 'Available'
    },
    {
      name: 'Jacek Nowak',
      title: 'Pro Engineer',
      expertise: 'angular JS',
      availability: 'Available'
    },
    // ... other SMEs
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

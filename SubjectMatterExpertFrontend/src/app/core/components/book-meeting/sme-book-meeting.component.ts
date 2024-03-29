// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup } from "@angular/forms";
//
// @Component({
//   selector: 'app-book-meeting',
//   templateUrl: './book-meeting.component.html',
//   styleUrls: ['./book-meeting.component.scss']
// })
// export class SmeBookMeetingComponent {
//   meetingForm: FormGroup;
//
//   constructor(private fb: FormBuilder) {
//     this.meetingForm = this.fb.group({
//       title: [''],
//       attendees: [''],
//       date: [''],
//       startTime: ['08:00'], // default value
//       endTime: ['16:00'], // adjusted default value for end time
//       location: [''],
//       onlineMeeting: [false],
//       description: ['']
//     });
//   }
//
//   onSubmit() {
//     // Process the form data here
//     console.log(this.meetingForm.value);
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// Import necessary for ng-bootstrap
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-meeting',
  templateUrl: './sme-book-meeting.component.html',
  styleUrls: ['./sme-book-meeting.component.scss']
})
export class SmeBookMeetingComponent {
  meetingForm: FormGroup;
  model: NgbDateStruct; // Add this line

  constructor(private fb: FormBuilder, private calendar: NgbCalendar) {
    this.meetingForm = this.fb.group({
      title: ['', Validators.required],
      attendees: ['', Validators.required],
      date: [''], // This will be updated via the datepicker
      startTime: [''],
      endTime: [''],
      location: [''],
      onlineMeeting: [false],
      description: ['']
    });
    this.model = calendar.getToday(); // Initialize the model with today's date
  }

  // Add a method to handle date selection
  onDateSelect(date: NgbDateStruct) {
    const isoDate = `${date.year}-${this.pad(date.month)}-${this.pad(date.day)}`;
    this.meetingForm.controls['date'].setValue(isoDate);
  }

  // Helper method for formatting
  private pad(number: number) {
    return (number < 10) ? `0${number}` : number;
  }

  onSubmit() {
    console.log(this.meetingForm.value);
  }

  openTeamsMeeting() {
    const formData = this.meetingForm.value;   
    console.log(formData.description)

    const attendeesArray = (formData.attendees as string).split(',').map((email: string) => email.trim());

    const teamsMeetingLink = `msteams:/l/meeting/new?subject=${formData.title}&attendees=${formData.attendees}&location=${formData.location}&description=${formData.description}&startTime=${formData.startTime}&endTime=${formData.endTime}&date=${formData.date}`;
    window.location.href = teamsMeetingLink;
    
  }
}

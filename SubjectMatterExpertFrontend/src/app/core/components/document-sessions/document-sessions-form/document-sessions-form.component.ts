import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-sessions-form',
  templateUrl: './document-sessions-form.component.html',
  styleUrl: './document-sessions-form.component.scss'
})
export class DocumentSessionsFormComponent implements OnInit {
  sessionForm? : FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    ){}

  ngOnInit() : void {
    this.sessionForm = this.formBuilder.group({
      sme_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      coachees: ['', Validators.pattern('^[a-zA-Z ]+$')],
      topic: ['', [Validators.required, Validators.pattern('^[a-zA-Z +\\-#]+$')]],
      sub_topic: ['', [Validators.required, Validators.pattern('^[a-zA-Z +\\-#]+$')]],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  saveLog(){
    console.log("Log Details: ", this.sessionForm?.value)
  }
}

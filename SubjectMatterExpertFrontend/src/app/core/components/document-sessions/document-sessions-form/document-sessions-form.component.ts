import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { SessionFormService } from 'src/app/core/services/session-form.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { SessionDetails } from 'src/app/models/session-details';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-document-sessions-form',
  templateUrl: './document-sessions-form.component.html',
  styleUrl: './document-sessions-form.component.scss'
})
export class DocumentSessionsFormComponent implements OnInit {
  sessionForm? : FormGroup;
  id:number=0;
  sessionDetail? : any |SessionDetails;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private serviceStorageService: StorageService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private sessionService : SessionFormService
    ){}

    ngOnInit(): void {
  
      this.sessionForm = this.formBuilder.group({
        topic: ['', [Validators.required, Validators.pattern('^[a-zA-Z +\\-#]+$')]],
        subTopic: ['', [Validators.required, Validators.pattern('^[a-zA-Z +\\-#]+$')]],
        description: ['', Validators.required],
        colleagues: ['', Validators.required],
      })
    
      this.activatedRoute.params.subscribe(params => {
        this.id = +params['id']; // Convert the id to a number
        console.log('Current session id: ', this.id);
  
        // Fetch session details using the retrieved id
        this.sessionService.getCurrentSession().subscribe((result: any | SessionDetails) => {
          // console.log(result);
          this.sessionDetail = result.find((user: { id: number; }) => user.id === this.id);
  
          console.log('Specific Id session details: ', this.sessionDetail);

          const colleaguesNames = this.sessionDetail.colleagues.map((colleague: { firstName: string; lastName: string; }) => `${colleague.firstName} ${colleague.lastName}`);
          
          this.sessionForm?.patchValue({
            topic: this.sessionDetail.topic,
            subTopic: this.sessionDetail.subTopic,
            description: this.sessionDetail.description,
            colleagues: colleaguesNames.join(', ')
          })
        });
      });
    }

  saveLog() {

    const Array = this.sessionForm?.value.colleagues.split(',').map((fullName: string) => {     
      const [firstName, lastName] = fullName.trim().split(' ');     
      return { firstName, lastName };   
    });

    console.log('Languages Array:', Array);
    // Creating the object to send to the backend
    const formData = {
      colleagues: Array,
      topic: this.sessionForm?.value.topic,
      subTopic: this.sessionForm?.value.subTopic,
      description: this.sessionForm?.value.description,
      // colleagues: this.sessionForm?.value.colleagues,
    };
    console.log("Form Details: ", formData);


    this.apiService.request('createSession', 'post', formData).subscribe((result: any) => {
      console.log("SME form result: ", result);
          if (result) {
            Swal.fire(
              'Success',
              'You have successfully added a session!',
              'success'
            ).then((swalResult) => {
              if (swalResult.value) this.router.navigate(['/document-session']);
            });
          }
        },
      );
  }


editSession() {
  console.log("Form value: ", this.sessionForm?.value);

  // Convert colleagues input to an array of objects
  const colleaguesArray = this.sessionForm?.value.colleagues.split(',').map((fullName: string) => {     
    const [firstName, lastName] = fullName.trim().split(' ');     
    return { firstName, lastName };   
  });

  // Creating the object to send to the backend
  const formData = {
    colleagues: colleaguesArray,
    topic: this.sessionForm?.value.topic,
    subTopic: this.sessionForm?.value.subTopic,
    description: this.sessionForm?.value.description,
  };

  console.log("Form Details: ", formData);

  this.apiService.request('editSession', 'put', formData).subscribe(
    (result: any) => {
      console.log("Edit session result: ", result);

      if (result) {
        Swal.fire(
          'Success',
          'You have successfully edited the session!',
          'success'
        ).then((swalResult) => {
          if (swalResult.value) this.router.navigate(['/document-session']);
        });
      }
    },
  );
}
}
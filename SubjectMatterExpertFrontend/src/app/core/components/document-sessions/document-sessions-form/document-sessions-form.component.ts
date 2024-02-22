import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { StorageService } from 'src/app/core/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-document-sessions-form',
  templateUrl: './document-sessions-form.component.html',
  styleUrl: './document-sessions-form.component.scss'
})
export class DocumentSessionsFormComponent implements OnInit {
  sessionForm? : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private serviceStorageService: StorageService,
    private router: Router
    ){}

  ngOnInit() : void {
    this.sessionForm = this.formBuilder.group({
      // sme_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      // coachees: ['', Validators.pattern('^[a-zA-Z ]+$')],
      topic: ['', [Validators.required, Validators.pattern('^[a-zA-Z +\\-#]+$')]],
      subTopic: ['', [Validators.required, Validators.pattern('^[a-zA-Z +\\-#]+$')]],
      // date: ['', Validators.required],
      // startTime: ['', Validators.required],
      // endTime: ['', Validators.required],
      description: ['', Validators.required],
      colleagues: ['', Validators.required],
    })
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
}

// submitSMEForm(): void {
//   // Splitting the string values into arrays
//   const languagesArray = this.SMEForm?.value.languages.split(',').map((lang: string) => lang.trim());
//   const areasOfExpertiseArray = this.SMEForm?.value.areasOfExpertise.split(',').map((area: string) => area.trim());

//   // Log languagesArray and areasOfExpertiseArray before creating formData
//   console.log('Languages Array:', languagesArray);
//   console.log('Areas of Expertise Array:', areasOfExpertiseArray);

//   // Creating the object to send to the backend
//   const formData = {
//     languages: languagesArray,
//     location: this.SMEForm?.value.location,
//     areasOfExpertise: areasOfExpertiseArray
//   };

//   console.log('SME form: ', formData);

//   // this.apiService.request('createRequestToBeSme', 'post', formData).subscribe((result: {[key: string]: any}) => {
//   //   console.log("SME form result: ", result)
//   this.apiService.request('createRequestToBeSme', 'post', formData).subscribe((result: any) => {
//     console.log("SME form result: ", result);


//     if (result) {
//       Swal.fire('Success', 'Your request has been sent to your agile coach!', 'success').then(swalResult => {
//         console.log("SwalResult:", swalResult);
//         // if(swalResult.value) this.router.navigate(['\hello']);
//       });
//     }
//   });
// }
// has context menu
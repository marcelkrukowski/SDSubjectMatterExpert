import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserDetailsService } from "../../services/user-details.service";
import { Observable } from "rxjs";
import { User } from "../../../../models/user.model";
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  SMEForm?: FormGroup;
  isModalOpen: boolean = false;


  userDetails$!: Observable<User>;

  ngOnInit(): void {
    this.userDetails$ = this.userService.getUserDetails();
    this.userDetails$.subscribe(e => console.log(e));

    this.SMEForm = this.formBuilder.group({
      areasOfExpertise: ['', Validators.required],
      location: ['', Validators.required],
      languages: ['', Validators.required],
    })

  }

  constructor(
    private userService: UserDetailsService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) { }


  //Open modal when applying for SME
  OpenModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
      this.isModalOpen = true;
    }

  }
  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
      this.isModalOpen = false;
    }
  }



  submitSMEForm(): void {
    // Splitting the string values into arrays
    const languagesArray = this.SMEForm?.value.languages.split(',').map((lang: string) => lang.trim());
    const areasOfExpertiseArray = this.SMEForm?.value.areasOfExpertise.split(',').map((area: string) => area.trim());

    // Log languagesArray and areasOfExpertiseArray before creating formData
    console.log('Languages Array:', languagesArray);
    console.log('Areas of Expertise Array:', areasOfExpertiseArray);

    // Creating the object to send to the backend
    const formData = {
      languages: languagesArray,
      location: this.SMEForm?.value.location,
      areasOfExpertise: areasOfExpertiseArray
    };

    console.log('SME form: ', formData);

    // this.apiService.request('createRequestToBeSme', 'post', formData).subscribe((result: {[key: string]: any}) => {
    //   console.log("SME form result: ", result)
    this.apiService.request('createRequestToBeSme', 'post', formData).subscribe((result: any) => {
      console.log("SME form result: ", result);


      if (result) {
        Swal.fire('Success', 'Your request has been sent to your agile coach!', 'success').then(swalResult => {
          console.log("SwalResult:", swalResult);
          // if(swalResult.value) this.router.navigate(['\hello']);
        });
      }
    });
  }


}



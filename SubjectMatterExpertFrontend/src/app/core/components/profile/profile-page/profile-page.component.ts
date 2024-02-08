import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { apiService } from 'src/app/core/services/api.service';
import { ServiceStorageService } from 'src/app/core/services/service-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  SMEForm?: FormGroup;
  profileForm!: FormGroup;
  isEditing: boolean = false;
  currentID: string | null = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  role: string = '';
  areaOfExpertise: string = '';
  editMode: boolean = false;
  profileDetails?: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: apiService,
    private storageService: ServiceStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //get current user id
    this.currentID = this.storageService.get('SMEuser').id;

    //call method to get user details for current user id
    this.getUserDetails();

    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['']
    })

    this.SMEForm = this.formBuilder.group({
      areaOfExpertise: ['', Validators.required],
      location: ['', Validators.required],
      languages: ['', Validators.required],
      timeSlots: ['', Validators.required],

    })

  }

  getUserDetails() {
    this.apiService.request('currentProfile', 'get', undefined, this.currentID).subscribe((result: any) => {
      console.log('User Deatils results: ', result);
      this.currentID = this.storageService.get('SMEuser')?.id;
      this.firstName = this.storageService.get('SMEuser')?.firstname;
      this.lastName = this.storageService.get('SMEuser')?.lastname;
      this.email = this.storageService.get('SMEuser')?.email;
      this.areaOfExpertise = this.storageService.get('SMEuser')?.areaOfExpertise;
      this.role = this.storageService.get('SMEuser')?.role;
    })
  }

  submitSMEForm() {
    console.log("Login Form: ", this.SMEForm?.value);
  }

  enableEditing() {
    this.editMode = true;

    this.profileForm.patchValue({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role
    });


  }


  saveChanges() {
    // Disable editing mode after saving
    this.editMode = false;

    this.apiService.request('editProfile', 'put', this.profileForm?.value, this.currentID).subscribe(async (result: any) => {
      console.log('Edit car result: ', result)
      this.profileForm.patchValue(result);
      this.firstName = result.firstname;
      this.lastName = result.lastname;
      this.email = result.email;
      this.role = result.role;


      if (result) {
        const { value: redirecturl } = await Swal.fire(
          'Success',
          'Profile details updated successfully.',
          'success'
        );

        console.log('Changes saved.');
        console.log("redirecturl: ", redirecturl)
      }

    });

  }

  OpenModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }


}



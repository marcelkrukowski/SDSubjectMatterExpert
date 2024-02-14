import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { StorageService } from 'src/app/core/services/storage.service';
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
  isSMEButtonVisible: boolean = true;
  isSaveButtonVisible: boolean = false;
  currentID: string | null = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  location: string = '';
  languages: string = '';
  areaOfExpertise: string = '';
  editMode: boolean = false;
  profileDetails?: any;

  isModalOpen: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //get current user id
    //this.currentID = this.storageService.get('SMEuser')?.id;


    //call method to get user details for current user deatils
    // this.getUserDetails();
    //
    // this.profileForm = this.formBuilder.group({
    //   firstName: [''],
    //   lastName: [''],
    //   email: ['', [Validators.required, Validators.email]],
    //   location: [''],
    //   languages: [''],
    // })
    //
    // this.SMEForm = this.formBuilder.group({
    //   areaOfExpertise: ['', Validators.required],
    //   location: ['', Validators.required],
    //   languages: ['', Validators.required],
    //   timeSlots: ['', Validators.required],
    //
    // })
  }

  // getUserDetails() {
  //   this.apiService.request('currentProfile', 'get', undefined, this.currentID).subscribe((result: any) => {
  //     console.log('User Deatils results: ', result);
  //     this.currentID = this.storageService.get('SMEuser')?.id;
  //     this.firstName = this.storageService.get('SMEuser')?.firstname;
  //     this.lastName = this.storageService.get('SMEuser')?.lastname;
  //     this.email = this.storageService.get('SMEuser')?.email;
  //     this.areaOfExpertise = this.storageService.get('SMEuser')?.areaOfExpertise;
  //     this.location = this.storageService.get('SMEuser')?.location;
  //     this.languages = this.storageService.get('SMEuser')?.languages;
  //   })
  // }



  submitSMEForm() {
    console.log("Login Form: ", this.SMEForm?.value);
  }

  enableEditing() {
    this.editMode = true;
    this.isSMEButtonVisible = false;
    this.isSaveButtonVisible = true;

    //add current user details to text boxes
    this.profileForm.patchValue({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      location: this.location,
      languages: this.languages,
    });


  }


  saveChanges() {
    // Disable editing mode after saving
    this.editMode = false;
    this.isSaveButtonVisible = false;
    this.isSMEButtonVisible = true;

    this.apiService.request('editProfile', 'put', this.profileForm?.value, this.currentID).subscribe(async (result: any) => {
      console.log('Edit profile result: ', result)
      // this.profileForm.patchValue(result);
      this.firstName = result.firstname;
      this.lastName = result.lastname;
      this.email = result.email;
      this.location= result.location;
      this.languages= result.languages;


      if (result) {
        const { value: redirecturl } = await Swal.fire(
          'Success',
          'Profile details updated successfully.',
          'success'
        );

        //set local storage to current user details
        this.storageService.set('SMEuser', result);


        console.log('Changes saved.');
        console.log("redirecturl: ", redirecturl)
      }

    });

  }

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


}



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
  isSMEButtonVisible: boolean = true;
  isSaveButtonVisible: boolean = false;
  currentID: string | null = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  location: string = '';
  isSME: boolean = false;
  
  editMode: boolean = false;
  profileDetails?: any;

  isModalOpen: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: apiService,
    private storageService: ServiceStorageService
  ) { }

  ngOnInit(): void {
    //get current user id
    // this.currentID = this.storageService.get('SMEuser').id;
    

    //call method to get user details for current user deatils
    this.getUserDetails();

    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      location: [''],
      languages: [''],
    })

    this.SMEForm = this.formBuilder.group({
      areaOfExpertise: ['', Validators.required],
      location: ['', Validators.required],
      languages: ['', Validators.required],
      timeSlots: ['', Validators.required],

    })

  }

  getUserDetails() {
    // this.currentID = this.storageService.get('SMEuser')?.id;
  
    // if (this.currentID !== undefined) {
      this.apiService.request('profile', 'get').subscribe((result: any) => {
        console.log('User Details result:', result);
        this.currentID = result.id
        
        this.firstName = result.firstname;
        this.lastName = result.lastname;
        this.email = result.email;
        this.location = result.location;
        this.isSME = result.isSME;

        this.applyForSme();
        
       
      });
    // }
  }



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
    });


  }


  saveChanges() {
    // Disable editing mode after saving
    this.editMode = false;
    this.isSaveButtonVisible = false;
    this.isSMEButtonVisible = true;

    this.currentID = this.storageService.get('SMEuser')?.id;
    console.log("alala", this.currentID);
    
    this.apiService.request('editProfile', 'put', this.profileForm?.value, this.currentID).subscribe(async (result: any) => {
      console.log('Edit profile result: ', result)
      // this.profileForm.patchValue(result);
      this.firstName = result.firstname;
      this.lastName = result.lastname;
      this.email = result.email;
      this.location= result.location;


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
        this.applyForSme();
      }

    });

  }

  //function to show and hide Apply for SME button
  applyForSme(){
    if(this.isSME === true){
      this.isSMEButtonVisible = false;  
    }
    else{
      this.isSMEButtonVisible = true;
    }
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



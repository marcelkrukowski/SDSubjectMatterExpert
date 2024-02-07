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
  areaOfExpertise: string = '';
  editMode: boolean = false;
  profileSlug?: string | null;
  profileDetails?: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: apiService,
    private storageService: ServiceStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.currentID = this.storageService.get('SMEuser').id;
    this.firstName = this.storageService.get('SMEuser').firstname;
    this.lastName = this.storageService.get('SMEuser').lastname;
    console.log("asfdasfsdafsdf", this.currentID);
    console.log("aila", this.firstName);



    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
    })

    this.SMEForm = this.formBuilder.group({
      areaOfExpertise: ['', Validators.required],
      location: ['', Validators.required],
      languages: ['', Validators.required],
      timeSlots: ['', Validators.required],

    })



    //call method to get user details
    this.getUserDetails();
  }

  submitSMEForm() {
    console.log("Login Form: ", this.SMEForm?.value);
  }

  enableEditing() {
    this.isEditing = true;
    this.editMode = true;


  }

  updateField(field: string, event: Event) {
    // Handle the updated value, you may want to send it to a service or API
    const updatedValue = (event.target as HTMLElement).innerText.trim();
    console.log(`Updated ${field}: ${updatedValue}`);
  }

  saveChanges() {
    // Implement logic to save changes, e.g., update server-side data
    console.log('Changes saved.');
    this.isEditing = false; // Disable editing mode after saving
    this.editMode = false;

    this.apiService.request('profile3', 'put', this.profileForm?.value, this.currentID).subscribe(async (result: any) => {
      console.log('Edit car result: ', result)
      this.profileForm.patchValue(result);
      this.firstName=result.firstname;
      this.lastName=result.lastname;
      this.email=result.email;
      console.log("fatiguer", this.firstName);
      

      if(result){
        const {value: redirecturl} = await Swal.fire(
          'Success',
          'Car details updated successfully.',
          'success'
        );
 
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


  //Method to get current user details for profile
  // getUserDetails() {
  //   this.apiService.request('profile', 'get').subscribe((result: any) => {
  //     console.log('User Datails results: ', result);
  //     this.currentID = this.storageService.get('SMEuser')?.id;
  //     this.firstName = this.storageService.get('SMEuser')?.firstname;
  //     this.lastName = this.storageService.get('SMEuser')?.lastname;
  //     this.email = this.storageService.get('SMEuser')?.email;
  //     this.areaOfExpertise = this.storageService.get('SMEuser')?.areaOfExpertise;
  //   });


  // }


  getUserDetails() {
    this.apiService.request('profile2', 'get', undefined, this.currentID).subscribe((result: any) => {
      console.log('User Deatils results: ', result);
      this.currentID = this.storageService.get('SMEuser')?.id;
      this.firstName = this.storageService.get('SMEuser')?.firstname;
      this.lastName = this.storageService.get('SMEuser')?.lastname;
      this.email = this.storageService.get('SMEuser')?.email;
      this.areaOfExpertise = this.storageService.get('SMEuser')?.areaOfExpertise;
    })
  }


}



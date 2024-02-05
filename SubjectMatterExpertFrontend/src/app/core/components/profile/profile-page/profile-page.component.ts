import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceLoginService } from 'src/app/core/services/service-login.service';
import { ServiceStorageService } from 'src/app/core/services/service-storage.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  SMEForm?: FormGroup;
  isEditing: boolean = false;
  currentID: string | null = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  areaOfExpertise: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private serviceLoginService: ServiceLoginService,
    private storageService: ServiceStorageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.SMEForm = this.formBuilder.group({
      areaOfExpertise: ['', Validators.required],
      location: ['', Validators.required],
      languages: ['', Validators.required],
      timeSlots: ['', Validators.required],

    })

    // this.currentID = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log('User id: ', this.currentID);
    this.getUserDetails();

  }

  submitSMEForm() {
    console.log("Login Form: ", this.SMEForm?.value);
  }

  enableEditing() {
    this.isEditing = true;
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
  getUserDetails() {

    this.serviceLoginService.request('profile', 'get').subscribe((result: any) => {
      console.log('User Datails results: ', result);

      this.currentID = this.storageService.get('SMEuser')?.id;
      this.firstName = this.storageService.get('SMEuser')?.firstname;
      this.lastName = this.storageService.get('SMEuser')?.lastname;
      this.email = this.storageService.get('SMEuser')?.email;
      this.areaOfExpertise = this.storageService.get('SMEuser')?.areaOfExpertise;
    });


  }



}



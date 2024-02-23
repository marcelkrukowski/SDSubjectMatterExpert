import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserDetailsService } from "../../services/user-details.service";
import { Observable } from "rxjs";
import { User } from "../../../../models/user.model";
import { ApiService } from '../../services/api.service';
import { SdwdsHeaderProfileComponent } from '@sdworx/sdwds/header-profile';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})

export class ProfilePageComponent implements OnInit {
  SMEForm?: FormGroup;
  profileForm!: FormGroup;
  isModalOpen: boolean = false;

  //profile form var
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  location: string = '';
  languages: string = '';
  currentID: number = 0;


  userDetails$!: Observable<User>;
  role: string = '';
  isSME: boolean = true;
  editMode: boolean = false;
  

  ngOnInit(): void {
    this.userDetails$ = this.userService.getUserDetails();
    this.userDetails$.subscribe(e => {
      if (e.userRoles.length > 1) {
        this.role = e.userRoles[1].role
        console.log(this.role);
        if (this.role === 'SME') {
          this.isSME = true;
        }
      }
      else {
        this.isSME = false;
      }


    });

    this.userDetails$.subscribe(e => console.log(e.userRoles[1]));

    this.SMEForm = this.formBuilder.group({
      areasOfExpertise: ['', Validators.required],
      location: ['', Validators.required],
      languages: ['', Validators.required],
    })

    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      location: [''],
      languages: [''],
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

  enableEditing(){
    console.log("Click editing");
    this.editMode = true;

    //add current user details to text boxes
    console.log("First Name: " + this.firstName);

    this.userDetails$ = this.userService.getUserDetails();
    this.userDetails$.subscribe(e => {console.log(e.firstname);
      this.firstName = e.firstname;
      this.lastName = e.lastname;
      this.email = e.email;
      this.location = e.location;
      this.languages = e.languages;
      this.currentID = e.id;
        
    

    this.profileForm?.patchValue({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      location: this.location,
      languages: this.languages

    });
      
     
    });
    
  }

  //after editing
  saveChanges() {
    // Disable editing mode after saving
    this.editMode = false;
    // this.isSaveButtonVisible = false;
    // this.isSMEButtonVisible = true;


    console.log("This is the current id: " + this.currentID);
   
console.log("Profile form: "+ this.profileForm.value);

    this.apiService.request('editProfile', 'put', this.profileForm?.value).subscribe();

  }

  cancelChanges(){
    this.editMode=false;
  }


  Submit(): void {
    // Splitting the string values into arrays
    const languagesArray = this.SMEForm?.value.languages.split(',').map((lang: string) => lang.trim());
    const areasOfExpertiseArray = this.SMEForm?.value.areasOfExpertise.split(',').map((area: string) => area.trim());

    // Creating the object to send to the backend
    const formData = {
      languages: languagesArray,
      location: this.SMEForm?.value.location,
      areasOfExpertise: areasOfExpertiseArray
    };
    console.log('SME form: ', formData);

    this.apiService.request('createRequestToBeSme', 'post', formData).subscribe();
    this.CloseModel();
  }

  submitSMEForm() {
    Swal.fire('Success','Your request has been sent to your agile coach', 'success').then(swalResult => {
      console.log("SwalResult:", swalResult);
    }).then((result) => {
      this.Submit();
    });
  }
}




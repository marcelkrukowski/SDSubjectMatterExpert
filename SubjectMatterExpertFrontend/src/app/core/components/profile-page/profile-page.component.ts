import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserDetailsService } from "../../services/user-details.service";
import { Observable } from "rxjs";
import { User, languageName } from "../../../../models/user.model";
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})

export class ProfilePageComponent implements OnInit {
  SMEForm?: FormGroup;
  profileForm!: FormGroup;
  isModalOpen: boolean = false;
  public isEmailValid? = false;

  public isLoading = false;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  location: string = '';
  languages: languageName[] = [];
  currentID: number = 0;


  userDetails$!: Observable<User>;
  role: string = '';
  isSME: boolean = true;
  editMode: boolean = false;


  ngOnInit(): void {
    
    this.userDetails$ = this.userService.getUserDetails();

    this.isLoading = true;
    if(this.isLoading===true){
      console.log("ss");
      
    }
    this.userDetails$.subscribe(e => {
      if (e.userRoles.length > 1) {
        this.role = e.userRoles[1].role   //could have looped though the array to find the user role instead
        console.log(this.role);
        if (this.role === 'SME') {
          this.isSME = true;
          this.isLoading = false;
        }
        else{
          this.isSME = false;
          this.isLoading = false;
        }
        
      }
      else {
        this.isSME = false;
        this.isLoading = false;
      }


    });

    this.userDetails$.subscribe(e => console.log(e.userRoles[1]));

    this.SMEForm = this.formBuilder.group({
      areasOfExpertise: ['', Validators.required],
      location: ['', Validators.required],
      languages: ['', Validators.required],
    })

    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: [''],
      languages: [''],
    })

    this.profileForm.valueChanges.subscribe(() => {
      this.updateValidity();
    });

    

  }

  updateValidity(): void {
    this.isEmailValid = this.profileForm.get('email')?.valid;

  }

  constructor(
    private userService: UserDetailsService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
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

  enableEditing() {
    console.log("Click editing");
    this.editMode = true;

    //add current user details to text boxes
    console.log("First Name: " + this.firstName);

    this.userDetails$ = this.userService.getUserDetails();
    this.userDetails$.subscribe(e => {
      console.log("User details: ", e);
      this.firstName = e.firstname;
      this.lastName = e.lastname;
      this.email = e.email;
      this.location = e.location;
      this.languages = e.languages;
      this.currentID = e.id;

      //because languages is an array
      const languageNames = this.languages.map(language => language.languageName);
      this.profileForm?.patchValue({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        location: this.location,
        languages: languageNames

      });


    });

  }

  //after editing
  saveChanges() {
    // Disable editing mode after saving
    this.editMode = false;
    this.apiService.request('editProfile', 'put', this.profileForm?.value).subscribe();
    window.location.reload();
  }

  cancelChanges() {
    this.editMode = false;
  }


  submitSMEForm(): void {
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

    this.apiService.request('createRequestToBeSme', 'post', formData).subscribe((result: any) => {
      console.log("Profile request result: ", result);
 
      if (result) {
        Swal.fire(
          'Success',
          'Your request has been sent to your agile coach!',
          'success'
        ).then((swalResult) => {
          if (swalResult.value) this.router.navigate(['/profile']);
        });
        this.CloseModel();
      }
    }, (error) => {
      if (error.status === 500) {
        // Handle 500 Internal Server Error
        Swal.fire(
          'Error',
          'You already have an ongoing request, please wait for agile coach to accept or decline before sending another request',
          'error'
        );
        this.CloseModel();
      } else {
        // Handle other errors
        Swal.fire(
          'Error',
          'An error occurred. Please try again later.',
          'error'
        );
      }
    });
  }
}




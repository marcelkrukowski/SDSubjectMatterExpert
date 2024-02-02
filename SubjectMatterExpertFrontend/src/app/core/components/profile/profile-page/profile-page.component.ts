import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

 SMEForm?: FormGroup;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  )
  {}

  ngOnInit(): void{
    this.SMEForm = this.formBuilder.group({
      areaOfExpertise: ['', Validators.required],
      location: ['', Validators.required],
      languages: ['', Validators.required],
      timeSlots: ['', Validators.required],

    })
  }

  submitSMEForm(){
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
    if(modelDiv!=null){
      modelDiv.style.display = 'block';  
    }
  }
  
  
  CloseModel(){
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!=null){
      modelDiv.style.display = 'none';  
    }
  }

  

}



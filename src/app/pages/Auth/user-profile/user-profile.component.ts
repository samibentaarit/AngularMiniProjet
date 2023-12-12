import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserprofileService } from 'src/app/services/userprofile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  inputsDisabled: boolean = true; // Initially set to true
  infoForm: FormGroup;
  
  userId: number;


  constructor(private fb: FormBuilder,private userProfileService: UserprofileService) {}

  ngOnInit() {
    // Get userId from sessionStorage
    const userIdFromStorage = sessionStorage.getItem('id');

    // Check if userIdFromStorage is a valid number
    this.userId = userIdFromStorage ? +userIdFromStorage : null;

   


    this.email = sessionStorage.getItem('email') || '';
    this.firstName = sessionStorage.getItem('firstName') || '';
    this.lastName = sessionStorage.getItem('lastName') || '';
    this.infoForm = this.fb.group({
      email: [{ value: this.email, disabled: this.inputsDisabled }, [Validators.required, Validators.email]],
      firstName: [{ value: this.firstName, disabled: this.inputsDisabled }, this.customLastNameValidator()],
      lastName: [
        { value: this.lastName, disabled: this.inputsDisabled },
        [this.customLastNameValidator()]
      ],
    });
  }

  toggleInputs() {
    this.inputsDisabled = !this.inputsDisabled;

    // Enable or disable form controls based on inputsDisabled
    if (this.inputsDisabled) {
      this.infoForm.disable();
    } else {
      this.infoForm.enable();
    }
  }

  get form() {
    return this.infoForm.controls;
  }

  customLastNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;

      // Check if the value is at least 5 letters long
      const isLengthValid = value && value.length >= 5;

      // Check if the value contains only letters
      const isLettersOnly = /^[a-zA-Z]+$/.test(value);

      // Determine if the validation fails
      const isValid = isLengthValid && isLettersOnly;

      return isValid ? null : { 'invalidLastName': true };
    };
  }


  onSubmit() {
    // Check if the form is valid
    if (this.infoForm.valid) {
      // Create an object with the updated user data
      const updatedUserData: any = {
        firstName: this.infoForm.value.firstName,
        lastName: this.infoForm.value.lastName,
        // Add other fields as needed
      };
      sessionStorage.setItem('firstName', updatedUserData.firstName);
      sessionStorage.setItem('lastName', updatedUserData.lastName);
      // Call the service method to update user data
      this.userProfileService.updateUserData(this.userId, updatedUserData).subscribe(
        () => {
          console.log('Updated user data:');
          
          // Optionally, you can disable the form inputs after a successful update
          this.inputsDisabled = true;
          this.infoForm.disable();
        },
        (error) => {
          console.error('Error updating user data:', error);
          // Handle error as needed
        }
      );
    }
  }
}

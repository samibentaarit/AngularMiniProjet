import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  inputsDisabled: boolean = true; // Initially set to true
  infoForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth1Service } from 'src/app/services/auth1.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
})
export class ForgetPasswordComponent {
  emailForm: FormGroup;
  emailreset: string='';

  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth1Service,
    private router: Router,
    private http :HttpClient,
    private route: ActivatedRoute 
  ) {
    
    this.emailForm = this.formBuilder.group({
      emailreset: ['@gmail.com', [Validators.required, Validators.email]], // Set your default email here
    });
  
  }

  // Declare 'f' property
  get f() {
    return this.emailForm.controls;
  }

  onEmailSubmit() {
    console.log('Form:', this.emailForm);
    // Handle the form submission logic here
    console.log('', this.emailForm.value.emailreset);
    // You can send the email value to a service or perform any other actions as needed
    this.authService.resetPassword(this.emailForm.value.emailreset).subscribe(response => {
      // Handle successful login, e.g., store token, navigate to home page, etc.
      console.log('Email submitted successfully', response);
    }, error => {
      if (error.status === 404) {
        console.error('User not found', error);
      }  else {
    console.error('An unexpected error occurred', error);
    // Display a generic error message
  }
  });
  }
}

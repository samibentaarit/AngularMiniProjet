import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth1Service } from 'src/app/services/auth1.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  
  email: string = ''; // Declare the email property
  password: string = ''; // Declare the password property


  emailForm: FormGroup;
  emailreset: string='';
  newPasswordForm: FormGroup;
  newPassword: string='';
  token: string='';
  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth1Service,
    private router: Router,
    private http :HttpClient,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.emailForm = this.formBuilder.group({
      emailreset: ['@gmail.com', [Validators.required, Validators.email]], // Set your default email here
    });
    this.newPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]], // Set your default password here
    });
  }
  ngOnInit(): void {
     // Use the ActivatedRoute to get the parameter from the route
     this.route.queryParams.subscribe(params => {
      console.log(params)
      this.token = params['token']; // Assuming the parameter name is 'token'
      console.log(this.token)

    });
  }
  


  get form() {
    return this.loginForm.controls;
  }
  // Declare 'f' property
  get f() {
    return this.emailForm.controls;
  }
  get fr() {
    return this.newPasswordForm.controls;
  }
  
  onSubmit() {
    console.log('Form:', this.loginForm);

    console.log('Submit button clicked!');
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const email = this.form.email.value;
    const password = this.form.password.value;

    // Call your authentication service to perform the login
    this.authService.login11(this.email, this.password).subscribe(response => {
        // Handle successful login, e.g., store token, navigate to home page, etc.
        console.log('Login successful', response);
        this.router.navigate(['/home']); // Adjust the route based on your application
      }, error => {
      // Handle login error
      console.error('Login failed', error);
    });
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


  onNewPasswordSubmit() {
    // Assuming newPasswordForm is your FormGroup
    const newPasswordValue = this.newPasswordForm.value.newPassword;
    // Send a POST request with the new password and the token as a parameter
    const resetPasswordUrl =  environment.url+'/register/reset-password';
    const tokenQueryParam = `?token=${this.token}`;

    this.http.post(resetPasswordUrl + tokenQueryParam, { newPassword: newPasswordValue },{ responseType: 'text' as 'json' })
      .subscribe(
        (response) => {
          // Handle the response as needed
          console.log('Password reset successful', response);
        },
        (error) => {
          // Handle the error
          console.error('Password reset failed', error);
        }
      );
  }
}

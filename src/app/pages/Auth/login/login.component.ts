import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth1Service } from 'src/app/services/auth1.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  
  email: string = ''; // Declare the email property
  password: string = ''; // Declare the password property
  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth1Service,
    private router: Router,
    private http :HttpClient,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get form() {
    return this.loginForm.controls;
  }
  // Declare 'f' property
  get f() {
    return this.loginForm.controls;
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
    this.authService.login11(this.email, this.password)
      .subscribe(response => {
        // Handle successful login, e.g., store token, navigate to home page, etc.
        console.log('Login successful', response);
        this.router.navigate(['/home']); // Adjust the route based on your application
      }, error => {
      // Handle login error
      console.error('Login failed', error);
    });
  }
  ////////////////////////////////////////////


  onSusbmit() {
    console.log('Form:', this.loginForm);

    console.log('Submit button clicked!');
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const email = this.form.email.value;
    const password = this.form.password.value;

    
    this.authService.login11(this.email, this.password)
      .subscribe(response => {
        // Handle the response as needed (e.g., navigate to a different page)
        console.log('Login successful', response);
      }, error => {
        // Handle login error
        console.error('Login failed', error);
      });
  }





}

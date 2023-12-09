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
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  
  email: string = ''; // Declare the email property
  password: string = ''; // Declare the password property


  emailForm: FormGroup;
  emailreset: string='';
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


  }
  ngOnInit(): void {

    this.authService.logout();
    
  }
  


  get form() {
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
    this.authService.login11(this.email, this.password).subscribe(response => {
        // Handle successful login, e.g., store token, navigate to home page, etc.
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']); // Adjust the route based on your application
      }, error => {
      // Handle login error
      console.error('Login failed', error);
    });
  }




}

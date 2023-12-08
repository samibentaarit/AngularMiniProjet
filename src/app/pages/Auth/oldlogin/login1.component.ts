// login.component.ts

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth1Service } from 'src/app/services/auth1.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
})
export class Login1Component {
  email: string;
  password: string;

a:string;
  constructor(
    private authService: Auth1Service,
    private http :HttpClient,
     private router : Router
    ,private route: ActivatedRoute 
   ) {}

  ngOnInit(): void {
    // Use the ActivatedRoute to get the parameter from the route
    this.route.paramMap.subscribe(params => {
     console.log('All Params:', params.keys);  // Log all parameter keys
     this.a = params.get('a');
     console.log('a :', this.a);
   });
 }

  onSubmit() {
    this.authService.login11(this.email, this.password)
      .subscribe(response => {
        // Handle the response as needed (e.g., navigate to a different page)
        console.log('Login successful', response);
      }, error => {
        // Handle login error
        console.error('Login failed', error);
      });
  }


   toggleHiddenInput() {
    var hiddenInput = document.getElementById("hiddenInput");
    // Toggle the display property
    hiddenInput.style.display = (hiddenInput.style.display === 'none') ? 'block' : 'none';
}
}
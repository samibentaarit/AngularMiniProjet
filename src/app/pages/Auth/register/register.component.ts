import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Auth1Service } from 'src/app/services/auth1.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: Auth1Service
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: ['USER', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.firstName, this.lastName, this.email, this.password, this.role)
      .subscribe(response => {      // Handle the response as needed (e.g., navigate to a different page)
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      }, error => {
        // Handle registration error
        console.error('Registration failed', error);
        this.router.navigate(['/login']);
      });
  }
}


////////////////////////////////////




}


















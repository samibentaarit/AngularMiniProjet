
import { Component } from '@angular/core';
import { Auth1Service } from 'src/app/services/auth1.service';


@Component({
  selector: 'app-register',
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.scss'],
})
export class Register1Component {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;

  constructor(private authService: Auth1Service) {}

  onSubmit() {
    this.authService.register(this.firstName, this.lastName, this.email, this.password, this.role)
      .subscribe(response => {
        // Handle the response as needed (e.g., navigate to a different page)
        console.log('Registration successful', response);
      }, error => {
        // Handle registration error
        console.error('Registration failed', error);
      });
  }
}
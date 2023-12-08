import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'http';
import { Auth1Service } from 'src/app/services/auth1.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
})
export class NewPassComponent implements OnInit{
  newPasswordForm: FormGroup;
  newPassword: string='';
  token: string='';
  constructor(
    private formBuilder: FormBuilder,
    private http :HttpClient,
    private route: ActivatedRoute

  ) {
    this.newPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]], // Set your default password here
    });
}
ngOnInit(): void {
  // Use the ActivatedRoute to get the parameter from the route
  this.route.queryParams.subscribe(params => {
   this.token = params['token']; // Assuming the parameter name is 'token'
 });
}

get fr() {
  return this.newPasswordForm.controls;
}

onNewPasswordSubmit() {
  // Assuming newPasswordForm is your FormGroup
  const newPasswordValue = this.newPasswordForm.value.newPassword;
  // Send a POST request with the new password and the token as a parameter
  const resetPasswordUrl =  environment.url+'/register/reset-password';
  const tokenQueryParam = `?token=${this.token}`;
console.log(this.token)
  this.http.post(resetPasswordUrl + tokenQueryParam, { newPassword: newPasswordValue },{ responseType: 'text' as 'json' })
    .subscribe(
      (response) => {
        // Handle the response as needed
        console.log( response);
        console.log(this.token)

      },
      (error) => {
        // Handle the error
        console.error('Password reset failed', error);
      }
    );
}
}

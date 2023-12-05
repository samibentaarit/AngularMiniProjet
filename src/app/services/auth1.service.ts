import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth1Service {
  private apiUrl = 'http://localhost:60082';
  roleAs: string;

  constructor(private http: HttpClient) {}

  register(firstName: string, lastName: string, email: string, password: string, role?: string): Observable<any> {
    const body = { firstName, lastName, email, password, ...(role && { role }) };

    return this.http.post<any>(`${this.apiUrl}/register`, body, { responseType: 'text' as 'json' })
      .pipe(
        tap(response => this.handleAuthentication11(response)),
        catchError(error => throwError(error))
      );
  }

   handleAuthentication(response: any): void {
    // Assuming your backend sends an authentication token in the response
    const authToken = response.error.text;
   
    if (authToken) {
      const authToken =""

      const decodedToken: any = jwtDecode(authToken);
      // Store the authentication token in local storage
      localStorage.setItem('authToken', authToken);
  
      // You can also store other user details if needed
       localStorage.setItem('userInfo', JSON.stringify(decodedToken));

    }else {
      // Handle authentication failure, e.g., display an error message
      console.error('Authentication failed arja3 houni');
      console.log(response.message);
    }
  }


  resetPassword(email: string): Observable<any> {
    const body = { email };
    return this.http.post<string>(`${this.apiUrl}/register/password-reset-request`, body, { responseType: 'text' as 'json' })
  }


//////////////////
login11(email: string, password: string): Observable<any> {
  const body = { email, password };

  return this.http.post<string>(`${this.apiUrl}/authenticate`, body, { responseType: 'text' as 'json' })
    .pipe(
      tap(token => this.handleAuthentication11(token)),
      catchError(error => throwError(error))
    );
}

handleAuthentication11(token: string): void {
  if (token) {
    const decodedToken: any = jwtDecode(token);

    // Extract user information
    const firstName = decodedToken.firstName;
    const lastName = decodedToken.lastName;
    const role = decodedToken.role;
    const email = decodedToken.email;

    // Save user information in session storage
    sessionStorage.setItem('firstName', firstName);
    sessionStorage.setItem('lastName', lastName);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('email', email);

    // Save the token in session storage
    sessionStorage.setItem('authToken', token);

    // Other handling logic if needed
  } else {
    // Handle authentication failure, e.g., display an error message
    console.error('Authentication failed');
  }
}

getRole(role:String) {
      this.roleAs = sessionStorage.getItem('role');
          if(this.roleAs==role)
        return true;
      return false
    }

_is_logged(): boolean {
    return !!sessionStorage.getItem("authToken");
    }
logout(): void {
  // Remove the authentication token from session storage
  sessionStorage.removeItem('authToken');
}

get token(){
  return   sessionStorage.getItem('authToken');

}

}
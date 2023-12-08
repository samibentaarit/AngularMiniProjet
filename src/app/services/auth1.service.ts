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

  constructor(private http: HttpClient) {}

  register(firstName: string, lastName: string, email: string, password: string, role?: string): Observable<any> {
    const body = { firstName, lastName, email, password, ...(role && { role }) };

    return this.http.post<any>(`${this.apiUrl}/register`, body)
      .pipe(
        tap(response => this.handleAuthentication(response)),
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



//////////////////
login11(email: string, password: string): Observable<any> {
  const body = { email, password };

  return this.http.post<string>(`${this.apiUrl}/authenticate`, body, { responseType: 'text' as 'json' })
    .pipe(
      tap(token => this.handleAuthentication11(token)),
      catchError(error => throwError(error))
    );
}

private handleAuthentication11(token: string): void {
  if (token) {
    // Save the token in session storage
    sessionStorage.setItem('authToken', token);

    // Other handling logic if needed
  } else {
    // Handle authentication failure, e.g., display an error message
    console.error('Authentication failed');
  }
}

logout(): void {
  // Remove the authentication token from session storage
  sessionStorage.removeItem('authToken');
}

}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9191'; // Replace with your actual backend API URL
  private tokenStorageKey = 'authToken';

  private userSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem(this.tokenStorageKey);
    if (storedToken) {
      this.userSubject.next(storedToken);
    }
  }

  get user(): Observable<string | null> {
    return this.userSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body)
      .pipe(
        tap(response => this.handleAuthentication(response))
      );
  }

  register(firstName: string, lastName: string, email: string, password: string, role: string): Observable<any> {
    const body = { firstName, lastName, email, password, role };
    return this.http.post<any>(`${this.apiUrl}/register`, body)
      .pipe(
        tap(response => this.handleAuthentication(response))
      );
  }

  private handleAuthentication(response: any): void {
    const token = response.token;
    if (token) {
      localStorage.setItem(this.tokenStorageKey, token);
      this.userSubject.next(token);
      console.log('Authentication successful! Token:', token);
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenStorageKey);
    this.userSubject.next(null);
  }

  // Add more methods as needed, such as token validation, user information, etc.
}

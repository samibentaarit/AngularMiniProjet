import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Club } from '../models/club';
import {Universite} from "../models/universite";  // Assurez-vous d'importer correctement l'entité Club

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  constructor(private http: HttpClient) {}

  getAllClubs(): Observable<Club[]> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Club[]>(`${environment.url}/club/getAllClub`, { headers });  }

  getClubById(id: number): Observable<Club> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Club>(`${environment.url}/getClub/${id}`, { headers });
  }

  addClub(club: Club): Observable<Club> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.post<Club>(`${environment.url}/club/saveClub`, club, { headers });
  }

  updateClub(id: number, club: Club): Observable<Club> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.put<Club>(`${environment.url}/club/updateClub/${id}`, club, { headers });
  }

  deleteClub(id: number): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.delete(`${environment.url}/club/deleteClub/${id}`, { headers });
  }
  assignClubToUniversity(universityId: number, clubId: number): Observable<any> {
    const url = `${environment.url}/universites/${universityId}/clubs/${clubId}`;
  
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);
  
    return this.http.post(url, {}, { headers });
  }
  // Autres méthodes liées aux clubs...
}

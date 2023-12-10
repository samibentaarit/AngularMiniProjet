import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Universite } from '../models/universite';
import {Club} from "../models/club";
// chambre.service.ts


@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  constructor(private http: HttpClient) {}

  getAllUniversites(): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<any>(environment.url + '/universites', { headers });
  }

  getUniversiteById(id: number) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Universite>(environment.url + '/universites/' + id, { headers });
  }

  addUniversite(universite:{ nomUniversite: string; adresse: string}) {const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.post<Universite>(environment.url + '/universites', universite, { headers });
  }

  updateUniversite(id: number, universite: Universite) {const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.put<Universite>(environment.url + '/universites/' + id, universite, { headers });
  }

  deleteUniversite(id: number) {const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.delete(environment.url + '/universites/' + id, { headers });
  }

  getAllUniversiteEtatActif() {const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get(environment.url + '/universites/activer', { headers });
  }

  archiverUniversite(id: number) {const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.put(environment.url + '/universites/' + id + '/archiver', { headers });
  }
  searchUniversitesByName (name: string): Observable<Universite[]> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Universite[]>(`${environment.url}/universites/search?name=${name}`, { headers });
  }
  assignClubToUniversity(universityId: number, clubId: number): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    const url = `${environment.url}/universites/${universityId}/clubs/${clubId}`;

    return this.http.post(url, {}, { headers });
  }
  removeClubFromUniversity(universityId: number, clubId: number): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    const url = `${environment.url}/universites/${universityId}/clubs/${clubId}`;
    return this.http.delete(url, { headers });
  }

  getClubsByUniversity(universityId: number): Observable<Club[]> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    const url = `${environment.url}/universites/${universityId}/clubs`;
    return this.http.get<Club[]>(url, { headers });
  }
  
  
  
  }


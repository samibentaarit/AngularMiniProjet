import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Universite } from '../models/universite';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  constructor(private http: HttpClient) {}

  getAllUniversites() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Universite[]>(environment.url + '/universites', { headers });
  }

  getUniversiteById(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Universite>(environment.url + '/universites/' + id, { headers });
  }

  addUniversite(universite:{ nomUniversite: string; adresse: string}) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Universite>(environment.url + '/universites', universite, { headers });
  }

  updateUniversite(id: number, universite: Universite) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Universite>(environment.url + '/universites/' + id, universite, { headers });
  }

  deleteUniversite(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(environment.url + '/universites/' + id, { headers });
  }

  getAllUniversiteEtatActif() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/universites/activer', { headers });
  }

  archiverUniversite(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(environment.url + '/universites/' + id + '/archiver', { headers });
  }

}

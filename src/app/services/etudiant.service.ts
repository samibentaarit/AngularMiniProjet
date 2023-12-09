
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Etudiant } from '../models/etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http: HttpClient) {}

  getAllEtudiants() {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Etudiant[]>(environment.url + '/etudiant', { headers });
  }

  getEtudiantById(id: number) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
        return this.http.get<Etudiant>(environment.url + '/etudiants/' + id, { headers });
  }

  addEtudiant(etudiant: Etudiant) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.post<Etudiant>(environment.url + '/saveEtudiant', etudiant, { headers });
  }

  updateEtudiant(id: number, etudiant: Etudiant) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.put<Etudiant>(environment.url + '/etudiants/' + id, etudiant, { headers });
  }

  deleteEtudiant(id: number) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.delete(environment.url + '/etudiants/' + id, { headers });
  }

  // Other methods related to students...

}

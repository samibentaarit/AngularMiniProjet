import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipement } from '../models/equipement';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {


  constructor(private http: HttpClient) {}

  getAllEquipements(): Observable<Equipement[]> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Equipement[]>(environment.url + '/equipement', { headers });
  }

  getEquipementById(id: number): Observable<Equipement> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Equipement>(environment.url + '/equipement/' + id, { headers });
  }

  addEquipement(equipement: Equipement): Observable<Equipement> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.post<Equipement>(environment.url + '/equipement', equipement, { headers });
  }

  updateEquipement(id: number, equipement: Equipement): Observable<Equipement> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.put<Equipement>(environment.url + '/equipement/' + id, equipement, { headers });
  }

  deleteEquipement(id: number): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.delete(environment.url + '/equipement/' + id, { headers });
  }
}

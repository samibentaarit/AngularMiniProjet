import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chambre } from '../models/chambre';
import {Equipement} from '../models/equipement';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  constructor(private http: HttpClient) {}

  getAllChambres(): Observable<Chambre[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Chambre[]>(environment.url + '/chambre', { headers });
  }

  getChambreById(id: string): Observable<Chambre> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Chambre>(environment.url + '/chambre/' + id, { headers });
  }

  isNumeroChambreExists(numeroChambre: number): Observable<boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<boolean>(`${environment.url}/chambre/exists/${numeroChambre}`, { headers });
  }
  addChambre(chambre: Chambre): Observable<Chambre> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Chambre>(environment.url + '/chambre', chambre, { headers });
  }

  updateChambre(id: number, chambre: Chambre): Observable<Chambre> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Chambre>(environment.url + '/chambre/' + id, chambre, { headers });
  }

  deleteChambre(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(environment.url + '/chambre/' + id, { headers });
  }

  //   getAllEquipements(sortOrder: any): Observable<Equipement[]> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.get<Equipement[]>(environment.url + '/equipement', { headers });
  // }

  addEquipementToChambre(chambreId: number, equipementId: number): Observable<Chambre> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Chambre>(
      `${environment.url}/chambre/${chambreId}/equipements/${equipementId}`, {}, { headers }
    );
  }

  removeEquipementFromChambre(chambreId: number, equipementId: number): Observable<Chambre> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<Chambre>(
      `${environment.url}/chambre/${chambreId}/equipements/${equipementId}`, { headers }
    );
  }
  getAllEquipements(sortOrder: any): Observable<Equipement[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Equipement[]>(environment.url + `/equipement?sortOrder=${sortOrder}`, { headers });
  }
}

// chambre.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chambre } from '../models/chambre';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  private apiUrl: string = environment.url + '/chambres';

  constructor(private http: HttpClient) {}

  getAllChambres(): Observable<Chambre[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Chambre[]>(this.apiUrl, { headers });
  }

  getChambreById(id: number): Observable<Chambre> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Chambre>(`${this.apiUrl}/${id}`, { headers });
  }

  addChambre(chambre: { numeroChambre: number; typeC: string }): Observable<Chambre> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Chambre>(this.apiUrl, chambre, { headers });
  }

  updateChambre(id: number, chambre: Chambre): Observable<Chambre> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Chambre>(`${this.apiUrl}/${id}`, chambre, { headers });
  }

  deleteChambre(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}

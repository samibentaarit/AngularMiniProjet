import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Bibliotheque} from "../models/bibliotheque";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BibliothequeService {

  constructor(private http: HttpClient) { }
  getAllBibliotheques() {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Bibliotheque[]>(environment.url + '/bibliotheque', { headers });
  }

  getBibliothequeById(id: number) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Bibliotheque>(environment.url + '/bibliotheque/' + id, { headers });
  }

  addBibliotheque(blocId: number,bibliotheque:{ titreBibliotheque: string; descriptionBibliotheque: string;
  }) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.post<Bibliotheque>(environment.url + '/bibliotheque/' + blocId + '/bibliotheques', bibliotheque, { headers });
  }

  updateBibliotheque(id: number, blocId: number, bibliotheque: Bibliotheque) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.put<Bibliotheque>(environment.url +'/bibliotheque/'+ blocId +'/bibliotheques/' + id, bibliotheque, { headers });
  }


  deleteBibliotheque(idBibliotheque: number): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.delete<any>(`${environment.url}/bibliotheque/${idBibliotheque}`, { headers });
  }


  ajouterBibliothequeAuBloc(idBloc: number, bibliotheque: any): Observable<any> {
    const url = `${environment.url}/bibliotheque/${idBloc}/bibliotheques`;
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);

    return this.http.post(url, bibliotheque, { headers });
  }

  getBlocDetails(idBloc: number): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);

    const url = `${environment.url}/bloc/${idBloc}/details`;
    return this.http.get(url, { headers });
  }

  getBibliothequeByBlocId(idBloc: number): Observable<Bibliotheque> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);

    const url = `${environment.url}/bloc/${idBloc}/bibliotheque`; // Utilisez le bon point de terminaison
    return this.http.get<Bibliotheque>(url, { headers });
  }
}

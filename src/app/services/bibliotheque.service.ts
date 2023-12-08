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
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Bibliotheque[]>(environment.url + '/bibliotheque', { headers });
  }

  getBibliothequeById(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Bibliotheque>(environment.url + '/bibliotheque/' + id, { headers });
  }

  addBibliotheque(blocId: number,bibliotheque:{ titreBibliotheque: string; descriptionBibliotheque: string;
  }) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Bibliotheque>(environment.url + '/bibliotheque/' + blocId + '/bibliotheques', bibliotheque, { headers });
  }

  updateBibliotheque(id: number, blocId: number, bibliotheque: Bibliotheque) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Bibliotheque>(environment.url +'/bibliotheque/'+ blocId +'/bibliotheques/' + id, bibliotheque, { headers });
  }


  deleteBibliotheque(idBibliotheque: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<any>(`${environment.url}/bibliotheque/${idBibliotheque}`, { headers });
  }


  ajouterBibliothequeAuBloc(idBloc: number, bibliotheque: Bibliotheque): Observable<any> {
    const url = `${environment.url}/bibliotheque/${idBloc}/bibliotheques`;
    return this.http.post(url, bibliotheque);
  }

  getBlocDetails(idBloc: number): Observable<any> {
    const url = `${environment.url}/bloc/${idBloc}/details`;
    return this.http.get(url);
  }

  getBibliothequeByBlocId(idBloc: number): Observable<Bibliotheque> {
    const url = `${environment.url}/bloc/${idBloc}/bibliotheque`; // Utilisez le bon point de terminaison
    return this.http.get<Bibliotheque>(url);
  }
}

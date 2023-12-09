import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Bloc} from "../models/bloc";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BlocService {

  constructor(private http: HttpClient) { }
  getAllBlocs() {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Bloc[]>(environment.url + '/bloc', { headers })
      .pipe(
        tap((blocs: Bloc[]) => {
          console.log('Données récupérées:', blocs);
        })
      );

  }

  getBlocById(id: number) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Bloc>(environment.url + '/bloc/' + id, { headers });
  }

  addBloc(bloc:{ nomBloc: string; capaciteBloc: number;
  }) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.post<Bloc>(environment.url + '/bloc', bloc, { headers });
  }
  addBlocToFoyer(idFoyer: number, bloc: any): Observable<any> {
    const url = `${environment.url}/bloc/${idFoyer}/add-bloc`;
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.post<any>(url, bloc, { headers }); // Spécification du type de réponse attendue
  }
  mettreAJourBlocDansFoyer(idFoyer: number, idBloc: number, bloc: any): Observable<any> {
    const url = `${environment.url}/bloc/${idFoyer}/bloc/${idBloc}`;
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.put<any>(url, bloc, { headers });
  }

  updateBloc(id: number, bloc: Bloc) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.put<Bloc>(environment.url + '/bloc/' + id, bloc, { headers });
  }

  deleteBloc(id: number) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.delete(environment.url + '/bloc/' + id, { headers });
  }

  getBlocsByFoyerId(idFoyer: number): Observable<Bloc[]> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Bloc[]>(`${environment.url}/foyer/${idFoyer}/blocs`, { headers });
  }





}

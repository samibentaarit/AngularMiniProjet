import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Bloc} from "../models/bloc";
import {Observable} from "rxjs";
import {Chambre} from "../models/chambre";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bloc } from '../models/bloc';

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

  constructor(private http: HttpClient) {}

  getAllBlocs() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Bloc[]>(environment.url + '/bloc', { headers });
    return this.http.get<Bloc[]>(environment.url + '/blocs', { headers });
  constructor(private http: HttpClient) { }
  getAllBlocs() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Bloc[]>(environment.url + '/bloc', { headers })
      .pipe(
      tap((blocs: Bloc[]) => {
        console.log('Données récupérées:', blocs);
      })
    );

  }

  getBlocById(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Bloc>(environment.url + '/bloc/' + id, { headers });
  }

  addBloc(bloc: Bloc) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Bloc>(environment.url + '/bloc', bloc, { headers });
  }
  addBloc(bloc:{ nomBloc: string; capaciteBloc: number;
  }) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Bloc>(environment.url + '/bloc', bloc, { headers });
  }
  addBloctoFoyer(idFoyer: number, bloc: any): Observable<any> {
    const url = `${environment.url}/bloc/${idFoyer}/add-bloc`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(url, bloc, { headers }); // Spécification du type de réponse attendue
  }
  mettreAJourBlocDansFoyer(idFoyer: number, idBloc: number, bloc: any): Observable<any> {
    const url = `${environment.url}/bloc/${idFoyer}/bloc/${idBloc}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<any>(url, bloc, { headers });
  }

  updateBloc(id: number, bloc: Bloc) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Bloc>(environment.url + '/bloc/' + id, bloc, { headers });
  }

  deleteBloc(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(environment.url + '/bloc/' + id, { headers });
  }
  getAllChambresInBloc(blocId: number): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${environment.url}/bloc/${blocId}/chambres`);

  getBlocsByFoyerId(idFoyer: number): Observable<Bloc[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Bloc[]>(`${environment.url}/foyer/${idFoyer}/blocs`, { headers });
  }






}

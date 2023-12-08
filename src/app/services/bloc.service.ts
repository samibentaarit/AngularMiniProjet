import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Bloc} from "../models/bloc";
import {Observable} from "rxjs";
import {Chambre} from "../models/chambre";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bloc } from '../models/bloc';

@Injectable({
  providedIn: 'root'
})
export class BlocService {

  constructor(private http: HttpClient) {}

  getAllBlocs() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Bloc[]>(environment.url + '/bloc', { headers });
    return this.http.get<Bloc[]>(environment.url + '/blocs', { headers });
  }

  getBlocById(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Bloc>(environment.url + '/bloc/' + id, { headers });
  }

  addBloc(bloc: Bloc) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Bloc>(environment.url + '/bloc', bloc, { headers });
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
  }






}

import { Injectable } from '@angular/core';
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
    return this.http.get<Bloc[]>(environment.url + '/blocs', { headers });
  }

  getBlocById(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Bloc>(environment.url + '/blocs/' + id, { headers });
  }

  addBloc(bloc: Bloc) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Bloc>(environment.url + '/blocs', bloc, { headers });
  }

  updateBloc(id: number, bloc: Bloc) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Bloc>(environment.url + '/blocs/' + id, bloc, { headers });
  }

  deleteBloc(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(environment.url + '/blocs/' + id, { headers });
  }
}

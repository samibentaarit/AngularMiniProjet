import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foyer } from '../models/foyer';
import {Bloc} from "../models/bloc";

@Injectable({
  providedIn: 'root'
})
export class FoyerService {

  constructor(private http: HttpClient) {}

  getAllFoyers(): Observable<Foyer[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Foyer[]>(environment.url + '/foyer', { headers });
  }

  getFoyerById(id: number): Observable<Foyer> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Foyer>(environment.url + '/foyer/' + id, { headers });
  }

  addFoyer(foyer: { nomFoyer: any }): Observable<Foyer> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Foyer>(environment.url + '/foyer', foyer, { headers });
  }

  updateFoyer(id: number, foyer: Foyer): Observable<Foyer> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Foyer>(environment.url + '/foyer/' + id, foyer, { headers });
  }

  deleteFoyer(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(environment.url + '/foyer/' + id, { headers });
  }

}


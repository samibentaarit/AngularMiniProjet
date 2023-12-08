import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Foyer } from '../models/foyer';
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FoyerService {

  constructor(private http: HttpClient) {
  }

  getAllFoyers() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Foyer[]>(environment.url + '/foyer', {headers});
  }
  getAverageFoyerCapacity(): Observable<number> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<number>(environment.url + '/universites/averageFoyerCapacity', {headers});


} }

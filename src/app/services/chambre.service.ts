import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Foyer} from "../models/foyer";
import {environment} from "../../environments/environment";
import {Chambre} from "../models/chambre";

@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  constructor(private http: HttpClient) { }
  getAllChambres() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Chambre[]>(environment.url + '/findAllChambre', { headers });
  }
}

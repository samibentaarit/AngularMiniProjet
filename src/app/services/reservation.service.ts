import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {}

  getAllReservations() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Reservation[]>(environment.url + '/reservation/'+'getAllReservation', { headers });
  }

  getReservationById(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Reservation>(environment.url + '/reservation/' + id, { headers });
  }

  addReservation(reservation:{ anneeUniversitaire: Date; estValide: boolean}) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Reservation>(environment.url + '/reservation'+'saveReservation', reservation, { headers });
  }

  updateReservation(id: number, reservation: Reservation) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Reservation>(environment.url + '/reservation/' + id, reservation, { headers });
  }

  deleteReservation(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(environment.url + '/reservation/'+'deleteReservation/' + id, { headers });
  }

  getAllReservationEtatActif() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.url + '/reservation/activer', { headers });
  }

  archiverReservation(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(environment.url + '/reservation/' + id + '/archiver', { headers });
  }

}

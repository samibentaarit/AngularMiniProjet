import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Universite } from '../models/universite';
import { Restaurant } from '../models/restaurant';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {


  public uri= environment

  constructor(private http: HttpClient) {}



  getAllRestaurants() {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Restaurant[]>(environment.url + '/restaurant/getallrestau', { headers });
  }

  getRestaurantById(id: number) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Restaurant>(environment.url + '/restaurant/'+'byid/'+ id, { headers });
  }

  addRestaurant(restaurant:{ nomRestaurant: string}) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);    console.log(restaurant)
    return this.http.post<Restaurant>(environment.url + '/restaurant/ajoutRes', restaurant, { headers });
  }

  updateRestaurant(id: number, restaurant: Restaurant) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.put<Restaurant>(environment.url + '/restaurant/' + id, restaurant, { headers });
  }

  deleteRestaurant(id: number) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);    return this.http.delete(environment.url + '/restaurant/' + id, { headers });
  }

  getAllRestaurantEtatActif() {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get(environment.url + '/Restaurants/activer', { headers });
  }

  archiverRestaurant(id: number) {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.put(environment.url + '/restaurants/' + id + '/archiver', { headers });
  }

}

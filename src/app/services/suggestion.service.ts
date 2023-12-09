import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Suggestion} from "../models/suggestion";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private http: HttpClient) {}

  getAllSuggestions(): Observable<Suggestion[]> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Suggestion[]>(environment.url + '/suggestion', { headers });
  }
  addSuggestionToFoyer(idFoyer: number, suggestion: any): Observable<{ message: string }> {
    const url = `${environment.url}/suggestion/${idFoyer}/add-suggestion`;
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.post<{ message: string }>(url, suggestion, { headers });
  }


  getSuggestionsByFoyerId(idFoyer: number): Observable<Suggestion[]> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Suggestion[]>(`${environment.url}/foyer/${idFoyer}/suggestions`, { headers });
  }


  saveSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
    return this.http.post<Suggestion>(environment.url + '/suggestion', suggestion, { headers });
  }
  mettreAJourSuggestionDansFoyer(idFoyer: number, idSuggestion: number, suggestion: Suggestion): Observable<void> {
    const url = `${environment.url}suggestion/${idFoyer}/suggestion/${idSuggestion}`;
    console.log('URL for updating suggestion:', url);// Vérifiez l'URL générée dans la console
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);    return this.http.put<void>(url, suggestion, { headers });
  }


  updateSuggestion(id: number, suggestion: Suggestion): Observable<Suggestion> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);    return this.http.put<Suggestion>(environment.url + '/suggestion/' + id, suggestion, { headers });
  }

  deleteSuggestion(id: number): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);    return this.http.delete(environment.url + '/suggestion/' + id, { headers });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivosService {

  private baseUrl = 'http://127.0.0.1:8000/api/'

  constructor(private http: HttpClient) { }

  //Metodo para obtener los activos
  getActivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}activo/`);
  }

  //Metodo para obtener detos de tabla de 
  getConfidencialidad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}confidencialidad/`)
  }

  //Metodo para obtener detos de tabla de criticidad
  getCriticidad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}criticidad/`)
  }

  //Metodo para obtener detos de tabla de integridad
  getIntegridad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}integridad/`)
  }

  //Metodo para obtener detos de tabla de disponibilidad
  getDisponibilidad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}disponibilidad/`)
  }

  //Metodos para registrar activos 

  //Metodo para eliminar activo 
  deleteActivo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`)
  }
}

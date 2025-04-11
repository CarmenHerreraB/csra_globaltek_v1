import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivosService {

  private baseUrl = 'http://127.0.0.1:8000/api/'

  constructor(private http: HttpClient) { }

  //Metodo para obtener datos de tabla de confidencialidad
  getConfidencialidad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}confidencialidad/`)
  }

  //Metodo para obtener datos de tabla de criticidad
  getCriticidad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}criticidad/`)
  }

  //Metodo para obtener datos de tabla de integridad
  getIntegridad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}integridad/`)
  }

  //Metodo para obtener datos de tabla de disponibilidad
  getDisponibilidad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}disponibilidad/`)
  }

  //Metodo para obtener datos de la tabla proceso 
  getProceso(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}proceso/`)
  }

  //Metodo para obtener datos de la tabla tipo de activo
  getTipoDeActivo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}tipodeactivo/`)
  }

  //Metodo para obtener datos de la tabla Datos Personales Activo
  getDatosPersonalesActivo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}datospersonales/`)
  }

  //Metodo para obtener datos de la tabla Datos Personales Activo
  getDuenoDelActivo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}duenodeactivo/`)
  }
  
  //Metodo para obtener datos de la tabla Custodio
  getCustodio(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}custodio/`)
  }

  //Metodo para obtener los activos
  getActivo(id: number) {
    return this.http.get(`${this.baseUrl}ActivoValues/${id}/`);
  }

  //Metodos para registrar activos 
  activoRegister(activoData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}activo/`, activoData)
  }

  //Metodo para eliminar activo 
  deleteActivo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}activo/${id}/`)
  }

  //Metodo para actualizar activo
  updateActivo(activoData: any): Observable<any>{
    return this.http.put(`${this.baseUrl}activo/${activoData.id}/`, activoData)
  }
}

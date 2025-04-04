import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivosService {

  private activosUrl = 'http://127.0.0.1:8000/api/activo/'

  constructor(private http: HttpClient) { }

  //Metodos para obtener los activos
  getActivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.activosUrl}`);
  }

  //Metodos para registrar activos 

  //Metodo para eliminar activo 
  deleteActivo(id: number): Observable<any> {
    return this.http.delete(`${this.activosUrl}${id}/`)
  }
}

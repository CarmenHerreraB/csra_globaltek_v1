import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigTablasService {

  private baseUrl = 'http://127.0.0.1:8000/api/'

  constructor(private htttp: HttpClient) { }


  //Agregar nuevo campo tabla tipo de activos
  agregarTipoActivo(data: any): Observable<any>{
    return this.htttp.post<any>(`${this.baseUrl}tipodeactivoCustom/`, data)
  }

  //Eliminar o desactivar campo de tipos de activos 
  eliminarTipoActivo(id: number): Observable<any>{
    return this.htttp.delete(`${this.baseUrl}tipodeactivoCustom/${id}/`)
  }

  //Agregar nuevo campo tabla de proceso
  agregarProceso(data: any): Observable<any>{
    return this.htttp.post<any>(`${this.baseUrl}procesoCustom/`, data)
  }

  //Eliminar o desactivar campo de proceso 
  eliminarProceso(id: number): Observable<any>{
    return this.htttp.delete(`${this.baseUrl}procesoCustom/${id}/`)
  }

  //Agregar tabla responsable/Custodio
  agregarResponsable(data: any): Observable<any>{
    return this.htttp.post<any>(`${this.baseUrl}custodioCustom/`, data)
  }

  //Eliminar tabla responsable/Custodio
  eliminarResponsable(id: number): Observable<any>{
    return this.htttp.delete(`${this.baseUrl}custodioCustom/${id}/`)
  }

  //Agregar datos tabla datos personales
  agregarDatosPersonales(data: any): Observable<any>{
    return this.htttp.post<any>(`${this.baseUrl}datospersonalesCustom/`, data)
  }

  //Eliminar datos tabla datos personales
  eliminarDatosPersonales(id: number): Observable<any>{
    return this.htttp.delete(`${this.baseUrl}datospersonalesCustom/${id}/`)
  }

  //Agregar datos dueño activo
  agregarDuenoActivo(data: any): Observable<any>{
    return this.htttp.post<any>(`${this.baseUrl}duenodeactivoCustom/`, data)
  }

  //Eliminar datos dueño activo
  eliminarDuenoActivo(id: number): Observable<any>{
    return this.htttp.delete(`${this.baseUrl}duenodeactivoCustom/${id}/`)
  }
}

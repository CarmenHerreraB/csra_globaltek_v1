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

  //Agregar datos en tabla de confidencialidad
  agregarCofidencialidad(data: any): Observable<any>{
    return this.htttp.post<any>(`${this.baseUrl}confidencialidadCustom/`, data)
  }

  //Eliminar datos de tabla confidencialidad
  eliminarConfidencialidad(id: number): Observable<any>{
    return this.htttp.delete(`${this.baseUrl}confidencialidadCustom/${id}/`)
  }

  //Agregar daros en tabla de integridad
  agregarIntegridad(data: any): Observable<any>{
    return this.htttp.post<any>(`${this.baseUrl}integridadCustom/`, data)
  }

  //Eliminar datos de tabla de integridad
  eliminarIntegridad(id: number): Observable<any>{
    return this.htttp.delete(`${this.baseUrl}integridadCustom/${id}/`)
  }

  //Agregar datos en tabla de disponibilidad
  agregarDisponibilidad(data: any): Observable<any>{
    return this.htttp.post<any>(`${this.baseUrl}disponibilidadCustom/`, data)
  }

  //Eliminar datos de tabla de disponibilidad
  eliminarDisponibilidad(id: number): Observable<any>{
    return this.htttp.delete(`${this.baseUrl}disponibilidadCustom/${id}/`)
  }

  
  //Metodos para volver a los valores por defecto de todas las tablas

  defectoTipoDeActivo(): Observable<any>{
    return this.htttp.post(`${this.baseUrl}tipodeactivoCustom/by_default/`, {})
  }

  defectoProceso(): Observable<any>{
    return this.htttp.post(`${this.baseUrl}procesoCustom/by_default/`, {})
  }

  defectoCustodio():Observable<any>{
    return this.htttp.post(`${this.baseUrl}custodioCustom/by_default/`, {})
  }

  defectoDatosPersonales(): Observable<any>{
    return this.htttp.post(`${this.baseUrl}datospersonalesCustom/by_default/`, {})
  }

  defectoDuenoActivo(): Observable<any>{
    return this.htttp.post(`${this.baseUrl}duenodeactivoCustom/by_default/`, {})
  }

  defectoConfidencialidad(): Observable<any>{
    return this.htttp.post(`${this.baseUrl}confidencialidadCustom/by_default/`, {})
  }

  defectoIntegridad(): Observable<any>{
    return this.htttp.post(`${this.baseUrl}integridadCustom/by_default/`, {})
  }

  defectoDisponibilidad(): Observable<any>{
    return this.htttp.post(`${this.baseUrl}disponibilidadCustom/by_default/`, {})
  }


  //Actualizar datos de tablas de criticidad, integridad y disponibilidad

  updateConfidencialidad(confidencialidadData: any): Observable<any>{
    return this.htttp.put(`${this.baseUrl}confidencialidadCustom/${confidencialidadData.id}/`, confidencialidadData)
  }

  updateIntegridad(integridadData: any): Observable<any>{
    return this.htttp.put(`${this.baseUrl}integridadCustom/${integridadData.id}/`, integridadData)
  }

  updateDisponibilidad(disponibilidadData: any): Observable<any>{
    return this.htttp.put(`${this.baseUrl}disponibilidadCustom/${disponibilidadData.id}/`, disponibilidadData)
  }
}

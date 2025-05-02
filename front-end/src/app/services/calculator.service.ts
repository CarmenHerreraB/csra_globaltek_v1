import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CalculatorRequest {
  expression: string;
}

interface CalculatorResponse {
  Result?: number;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})

export class CalculatorService {

  private apiUrl = 'http://127.0.0.1:8000/api/calculator/';
  private formulasUrl = 'http://127.0.0.1:8000/api/formulas/'

  constructor(private http: HttpClient) {}

  calculateExpression(expression: string): Observable<CalculatorResponse> {
    const body: CalculatorRequest = { expression };

    return this.http.post<CalculatorResponse>(this.apiUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  //Traer las formulas de config formulas
  getFormulas(){
    return this.http.get(`${this.formulasUrl}`);
  }

  //Agregar nueva formula
  agregarFormulas(formula: any): Observable<any> {
    return this.http.post<any>(`${this.formulasUrl}`, formula)
  }

  //Activar o desactivar formulas
  activarFormula(id: number): Observable<any> {
    return this.http.post(`${this.formulasUrl}${id}/activar/`, {});
  }

  //Eliminar formulas
  eliminarFormula(id: number): Observable<any> {
    return this.http.delete(`${this.formulasUrl}${id}/`)
  }
}

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

  constructor(private http: HttpClient) {}

  calculateExpression(expression: string): Observable<CalculatorResponse> {
    const body: CalculatorRequest = { expression };

    return this.http.post<CalculatorResponse>(this.apiUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisteruserService {

  private registerUrl = 'http://127.0.0.1:8000/api/usuarios/';

  constructor(private http: HttpClient) { }

  // Método para registrar usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, userData);
  }
}

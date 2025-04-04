import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://127.0.0.1:8000/api/login/';

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(credentials: { correo: string; password: string }): Observable<any> {
    return this.http.post(`${this.loginUrl}`, credentials);
  }

  // Método para verificar si hay un token
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve 'true' si hay un token, 'false' si no hay
  }

}

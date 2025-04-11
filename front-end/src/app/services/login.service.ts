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

  //Metodo para verificar si el tiempo de sesion ya expiro
  isSessionExpired(): boolean {
    const loginTime = localStorage.getItem('loginTime');
    if (!loginTime) return true;
  
    const now = new Date().getTime();
    const sessionDuration = 2 * 60 * 60 * 1000; // 2 horas en milisegundos
  
    return now - parseInt(loginTime, 10) > sessionDuration;
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
  }

  // Método para verificar si hay un token
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    return !this.isSessionExpired();
  }


}

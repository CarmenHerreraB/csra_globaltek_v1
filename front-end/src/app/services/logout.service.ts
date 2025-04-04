import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private logoutUrl = 'http://127.0.0.1:8000/api/logout/'; 

  constructor(private http: HttpClient, private router: Router) {}

  logout(): Observable<any> {
    return this.http.post(`${this.logoutUrl}`, {}, { withCredentials: true });
  }

  cerrarSesion(): void {
    this.logout().subscribe({
      next: () => {
        // Elimina los datos de autenticación en el frontend
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        // Redirige al usuario a la página de login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
      }
    });
  }
}

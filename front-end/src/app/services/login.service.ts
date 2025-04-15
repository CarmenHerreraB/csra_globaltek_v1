import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://127.0.0.1:8000/api/login/';
  private logoutUrl = 'http://127.0.0.1:8000/api/logout/'; 

  private inactivityTimeout: any;
  private readonly INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutos

  private listenersRegistered = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  // Método para iniciar sesión
  login(credentials: { correo: string; password: string }): Observable<any> {
    localStorage.setItem('loginTime', new Date().getTime().toString());
    this.resetInactivityTimer();
    return this.http.post(`${this.loginUrl}`, credentials);
  }

  // Verifica si hay un token para determinar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Hace la petición al backend para cerrar sesión
  logout(): Observable<any> {
    return this.http.post(`${this.logoutUrl}`, {}, { withCredentials: true });
  }

  // Elimina los tokens y redirige al login
  cerrarSesion(): void {
    this.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
      }
    });
  }

  // Inicia el monitoreo de inactividad una sola vez
  startMonitoringInactivity(): void {
    if (!this.listenersRegistered) {
      const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
      events.forEach(event =>
        window.addEventListener(event, () => this.resetInactivityTimer())
      );
      this.listenersRegistered = true;
    }
    this.resetInactivityTimer();
  }

  // Alerta para advertir el cierre de sesión por inactividad
  private showInactivityWarning(): void {
    let timerInterval: any;

    Swal.fire({
      title: '¿Sigues ahí?',
      html: 'Tu sesión se cerrará en <b></b> segundos por inactividad.',
      timer: 30000, // 30 segundos
      timerProgressBar: true,
      showCancelButton: true,
      confirmButtonText: 'Seguir conectado',
      confirmButtonColor: '#28A745', // Verde
      cancelButtonText: 'Cerrar sesión',
      allowOutsideClick: false,
      didOpen: () => {
        const content = Swal.getHtmlContainer()?.querySelector('b');
        if (content) {
          let remaining = 30;
          content.textContent = remaining.toString();
          timerInterval = setInterval(() => {
            remaining--;
            if (content) content.textContent = remaining.toString();
          }, 1000);
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then(result => {
      if (result.isConfirmed) {
        this.resetInactivityTimer();
      } else {
        this.cerrarSesion();
      }
    });
  }

  // Reinicia el temporizador de inactividad
  private resetInactivityTimer(): void {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }

    this.ngZone.runOutsideAngular(() => {
      this.inactivityTimeout = setTimeout(() => {
        this.ngZone.run(() => {
          this.showInactivityWarning();
        });
      }, this.INACTIVITY_LIMIT);
    });
  }
}

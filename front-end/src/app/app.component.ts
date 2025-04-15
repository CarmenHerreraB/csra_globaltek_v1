import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private loginService: LoginService){}
  title = 'front-end';

  ngOnInit(): void {
    // Verifica si el usuario está autenticado y comienza a monitorear
    if (this.loginService.isAuthenticated()) {
      this.loginService.startMonitoringInactivity();
    }
  }

}

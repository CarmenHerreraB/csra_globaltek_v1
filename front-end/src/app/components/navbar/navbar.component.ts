import { Component } from '@angular/core';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private logoutService: LogoutService) {}

  cerrarSesion(): void {
    this.logoutService.cerrarSesion();
  }
}

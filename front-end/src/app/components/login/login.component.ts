import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string = ''; // Para mostrar mensajes de error

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]], // Validación de email
      password: ['', [Validators.required, Validators.minLength(6)]], // Validación de contraseña
    });

    // Retrasar la actualización del estado hasta que el usuario interactúe
    setTimeout(() => {
      this.loginForm.markAsPristine();
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.loginService.login(credentials).subscribe(
        response => {
          console.log('Login exitoso:', response);
          localStorage.setItem('token', response.token); // Guardar token en localStorage
          // Redirigir al usuario o mostrar mensaje de éxito
        },
        error => {
          console.error('Error en el login:', error);
          this.errorMessage = 'Correo o contraseña incorrectos.';
        }
      );
    } else {
      console.log('El formulario no es válido.');
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }
}

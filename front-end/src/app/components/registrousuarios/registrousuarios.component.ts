import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisteruserService } from '../../services/registeruser.service';

@Component({
  selector: 'app-registrousuarios',
  standalone: false,
  templateUrl: './registrousuarios.component.html',
  styleUrl: './registrousuarios.component.css'
})
export class RegistrousuariosComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private registerUserService: RegisteruserService) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.pattern('^[a-zA-ZÀ-ÿ\\s]{3,30}$')]],
      correo: ['', [Validators.required, Validators.email]], 
      tipo_documento: [''], 
      numero_documento: ['', [Validators.pattern('^[0-9]{6,12}$')]], 
      telefono: ['', [Validators.pattern('^[0-9]{7,15}$')]],
      empresa: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      rolxpermiso: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      ]] // Obligatorio
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerUserService.registerUser(this.registerForm.value).subscribe(
        response => {
          console.log('Registro exitoso', response);
          alert('Usuario registrado correctamente');
        },
        error => {
          console.log('Error en el registro', error);
          alert('Usuario no registrado');
        }
      );
    } else {
      alert('Debe completar los campos correctamente.');
    }
  }
}
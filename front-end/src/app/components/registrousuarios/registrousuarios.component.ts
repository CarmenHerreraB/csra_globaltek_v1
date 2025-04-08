import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisteruserService } from '../../services/registeruser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrousuarios',
  standalone: false,
  templateUrl: './registrousuarios.component.html',
  styleUrls: ['./registrousuarios.component.css']
})
export class RegistrousuariosComponent implements OnInit {
  registerForm: FormGroup;
  showPassword: boolean = false;
  tipoDocumentos: any[] = [];
  roles: any[] = [];

  constructor(private fb: FormBuilder, private registerUserService: RegisteruserService) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.pattern('^[a-zA-ZÀ-ÿ\\s]{3,30}$')]],
      correo: ['', [Validators.required, Validators.email]], 
      tipo_documento: [''], 
      numero_documento: ['', [Validators.pattern('^[0-9]{6,12}$')]], 
      telefono: ['', [Validators.pattern('^[0-9]{7,15}$')]],
      empresa: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      rolxpermiso: [''],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]]
    });
  }

  ngOnInit(): void {
    // Cargar tipos de documento
    this.registerUserService.getTipoDocumentos().subscribe(data => {
      this.tipoDocumentos = data;
    });

    // Cargar roles
    this.registerUserService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Datos a enviar:', this.registerForm.value); //Agrega esto para depuración
  
      this.registerUserService.registerUser(this.registerForm.value).subscribe(
        response => {
          console.log('Registro exitoso', response);
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Usuario registrado correctamente',
            confirmButtonColor: '#28A745'
          }).then(() => {
            this.registerForm.reset();
          });
        },
        error => {
          console.log('Error en el registro', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar el usuario',
            confirmButtonColor: '#d33'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Debe completar los campos correctamente.',
        confirmButtonColor: '#f0ad4e'
      });
    }
  }
  
  

}

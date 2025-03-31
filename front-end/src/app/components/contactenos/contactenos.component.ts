import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contactenos',
  standalone: false,
  templateUrl: './contactenos.component.html',
  styleUrl: './contactenos.component.css'
})
export class ContactenosComponent {
  contactenosForm: FormGroup;

  constructor(private FormBuilder: FormBuilder){
    this.contactenosForm = this.FormBuilder.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      correoEmpresarial: ['', [Validators.required, Validators.email]],
      empresa: ['', [Validators.required, Validators.minLength(3)]],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      ciudad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),
         Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]]
    },
    { updateOn: 'blur' } //que se valide luego de que el usuario deja el campo 
  )
  }

  nombres: string = '';
  apellidos: string = '';
  correoEmpresarial: string = '';
  empresa: string = '';
  celular: string = '';
  ciudad: string = '';

  onSubmit() {
    if (this.contactenosForm.valid) {
      console.log('Usuario:', this.contactenosForm.value.nombres);
      console.log('Contraseña:', this.contactenosForm.value.apellidos);
    } else {
      console.log('El formulario no es válido.');
    }
  }
  

}

import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
import { ActivosService } from '../../services/activos.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-modal-agregar-activo',
  standalone: false,
  templateUrl: './modal-agregar-activo.component.html',
  styleUrl: './modal-agregar-activo.component.css'
})
export class ModalAgregarActivoComponent implements OnInit{
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  activoRegisterForm: FormGroup;

  confidencialidad: any[] = [];
  integridad: any[] = [];
  disponibilidad: any[] = [];
  criticidad: any[] = [];
  proceso: any[] = [];
  tipodeactivo: any[] = [];

  constructor(private fb: FormBuilder, private activosService: ActivosService){
    this.activoRegisterForm = this.fb.group({
      nombre: [''],
      proceso_area: [''],
      tipo_activo: [''],
      descripcion: [''],
      confidencialidad: [''],
      integridad: [''],
      disponibilidad: [''],
      criticidad: [''],
      datos_personales: [''],
      dueno_activo: [''],
      custodio: [''],
    })
  }
  
  ngOnInit(): void {
    //Cargar datos de confidencialidad
    this.activosService.getConfidencialidad().subscribe(data => { 
      this.confidencialidad = data;
    });

    //Cargar datos de Integridad
    this.activosService.getIntegridad().subscribe(data => { 
      this.integridad = data;
    });

    //Cargar datos de Disponibilidad
    this.activosService.getDisponibilidad().subscribe(data => { 
      this.disponibilidad = data;
    });

    //Cargar datos de criticidad
    this.activosService.getCriticidad().subscribe(data => { 
      this.criticidad = data;
    });

    //Cargar datos de criticidad
    this.activosService.getProceso().subscribe(data => { 
      this.proceso = data;
    });
  }

  closeModal() {
    this.close.emit(); // Notifica al padre que el modal se cerró
  }

  onSubmit(): void {
    if(this.activoRegisterForm.valid) {
      console.log('Datos a enviar:', this.activoRegisterForm.value);

      this.activosService.activoRegister(this.activoRegisterForm.value).subscribe(
        response => {
          console.log('Registro exitoso', response);
          alert('Usuario registrado correctamente');
          this.activoRegisterForm.reset();
        },
        error => {
          console.log('Error en el registro', error);
          alert('Error al registrar el usuario');
        }
      );
    } else {
      alert('Debe completar los campos correctamente.');
    }
    
  }
}

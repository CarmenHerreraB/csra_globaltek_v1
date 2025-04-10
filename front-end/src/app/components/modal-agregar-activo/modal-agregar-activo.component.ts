import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
import { ActivosService } from '../../services/activos.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-agregar-activo',
  standalone: false,
  templateUrl: './modal-agregar-activo.component.html',
  styleUrl: './modal-agregar-activo.component.css'
})
export class ModalAgregarActivoComponent implements OnInit{
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit(); // Notifica al padre que el modal se cerró
  }

  activoRegisterForm: FormGroup;

  confidencialidad: any[] = [];
  integridad: any[] = [];
  disponibilidad: any[] = [];
  criticidad: any[] = [];
  proceso: any[] = [];
  tipodeactivo: any[] = [];
  datospersonales: any[] = [];
  custodio: any[] = [];
  duenodeactivo: any[] = [];

  constructor(private fb: FormBuilder, private activosService: ActivosService){
    this.activoRegisterForm = this.fb.group({
      nombre: [''],
      proceso_area: [''],
      tipo_activo: [''],
      descripcion: [''],
      datos_personales: [''],
      dueno_activo: [''],
      custodio: [''],
      estadoxactivo: this.fb.group({
        confidencialidad: [''],
        integridad: [''],
        disponibilidad: [''],
        criticidad: [''],
      })
    });    
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

    //Cargar datos de proceso
    this.activosService.getProceso().subscribe(data => { 
      this.proceso = data;
    });

    //Cargar datos de Tipo de activo
    this.activosService.getTipoDeActivo().subscribe(data => { 
      this.tipodeactivo = data;
    });

    //Cargar datos de datos personales activo
    this.activosService.getDatosPersonalesActivo().subscribe(data => { 
      this.datospersonales = data;
    });

    //Cargar datos de dueno de activo
    this.activosService.getDuenoDelActivo().subscribe(data => { 
      this.duenodeactivo = data;
    });

    //Cargar datos de custodio
    this.activosService.getCustodio().subscribe(data => { 
      this.custodio = data;
    });
  }


  onSubmit(): void {
    if (this.activoRegisterForm.valid) {
      console.log('Datos a enviar:', this.activoRegisterForm.value);
  
      this.activosService.activoRegister(this.activoRegisterForm.value).subscribe(
        response => {
          console.log('Registro exitoso', response);
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Activo registrado correctamente',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.activoRegisterForm.reset();
            this.closeModal(); // Cierra el modal después de que el usuario haga clic en OK
          });
        },
        error => {
          console.log('Error en el registro', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar el activo',
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

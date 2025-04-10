import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ActivosService } from '../../services/activos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modaleditaractivo',
  standalone: false,
  templateUrl: './modaleditaractivo.component.html',
  styleUrl: './modaleditaractivo.component.css'
})
export class ModaleditaractivoComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() activo: any; // Recibe el activo desde el padre
  @Output() close = new EventEmitter<void>();

  activoEditForm: FormGroup;

  confidencialidad1: any[] = [];
  integridad1: any[] = [];
  disponibilidad1: any[] = [];
  criticidad1: any[] = [];
  proceso1: any[] = [];
  tipodeactivo1: any[] = [];
  datospersonales1: any[] = [];
  custodio1: any[] = [];
  duenodeactivo1: any[] = [];

  constructor(private activosService: ActivosService, private fb: FormBuilder) {
    this.activoEditForm = this.fb.group({
      id: [''], // importante para la actualización
      nombre: ['', [Validators.required]],
      proceso_area: ['', [Validators.required]],
      tipo_activo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      datos_personales: ['', [Validators.required]],
      dueno_activo: ['', [Validators.required]],
      custodio: ['', [Validators.required]],
      estadoxactivo: this.fb.group({
        confidencialidad: [''],
        integridad: [''],
        disponibilidad: [''],
        criticidad: [''],
      })
    });
  }

  ngOnInit(): void {
    this.cargarListas();
  }

  // Detecta cambios en @Input activo
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activo'] && this.activo) {
      this.setFormValues();
    }
  }

  setFormValues(): void {
    // Asegúrate de que el formulario se actualiza con los datos del activo
    this.activoEditForm.patchValue({
      id: this.activo.id,
      nombre: this.activo.nombre,
      proceso_area: this.activo.proceso_area,
      tipo_activo: this.activo.tipo_activo,
      descripcion: this.activo.descripcion,
      datos_personales: this.activo.datos_personales,
      dueno_activo: this.activo.dueno_activo,
      custodio: this.activo.custodio,
      estadoxactivo: {
        confidencialidad: this.activo.confidencialidad,
        integridad: this.activo.integridad,
        disponibilidad: this.activo.disponibilidad,
        criticidad: this.activo.criticidad,
      }
    });
  }

  cargarListas(): void {
    this.activosService.getConfidencialidad().subscribe(data => this.confidencialidad1 = data);
    this.activosService.getIntegridad().subscribe(data => this.integridad1 = data);
    this.activosService.getDisponibilidad().subscribe(data => this.disponibilidad1 = data);
    this.activosService.getCriticidad().subscribe(data => this.criticidad1 = data);
    this.activosService.getProceso().subscribe(data => this.proceso1 = data);
    this.activosService.getTipoDeActivo().subscribe(data => this.tipodeactivo1 = data);
    this.activosService.getDatosPersonalesActivo().subscribe(data => this.datospersonales1 = data);
    this.activosService.getDuenoDelActivo().subscribe(data => this.duenodeactivo1 = data);
    this.activosService.getCustodio().subscribe(data => this.custodio1 = data);
  }

  closeModalUpdate() {
    this.close.emit(); // Notifica al componente padre que se debe cerrar el modal
  }

  onSubmit(): void {
    if (this.activoEditForm.valid) {
      console.log('Datos a enviar', this.activoEditForm.value);

      this.activosService.updateActivo(this.activoEditForm.value).subscribe(
        response => {
          console.log('actualización exitosa', response);
          Swal.fire({
            icon: 'success',
            title: '¡Actualización exitosa!',
            text: 'Activo actualizado correctamente',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.activoEditForm.reset();
            this.closeModalUpdate();
          });
        },
        error => {
          console.error('Error al editar el activo', error);
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

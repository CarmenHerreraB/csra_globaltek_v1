import { Component, OnInit } from '@angular/core';
import { ActivosService } from '../../services/activos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modaleditaractivo',
  standalone: false,
  templateUrl: './modaleditaractivo.component.html',
  styleUrl: './modaleditaractivo.component.css'
})
export class ModaleditaractivoComponent implements OnInit{

  activoEditForm: FormGroup;
  
  confidencialidad: any[] = [];
  integridad: any[] = [];
  disponibilidad: any[] = [];
  criticidad: any[] = [];
  proceso: any[] = [];
  tipodeactivo: any[] = [];
  datospersonales: any[] = [];
  custodio: any[] = [];
  duenodeactivo: any[] = [];

  constructor(private activosService: ActivosService, private fb:FormBuilder){
    this.activoEditForm = this.fb.group({
      nombre: ['', [Validators.required]],
      proceso_area: ['', [Validators.required]],
      tipo_activo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      confidencialidad: ['', [Validators.required]],
      integridad: ['', [Validators.required]],
      disponibilidad: ['', [Validators.required]],
      criticidad: ['', [Validators.required]],
      datos_personales: ['', [Validators.required]],
      dueno_activo: ['', [Validators.required]],
      custodio: ['', [Validators.required]],
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
}

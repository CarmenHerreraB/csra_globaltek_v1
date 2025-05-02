import { Component, OnInit } from '@angular/core';
import { ActivosService } from '../../../services/activos.service';

@Component({
  selector: 'app-config-tablas',
  standalone: false,
  templateUrl: './config-tablas.component.html',
  styleUrl: './config-tablas.component.css'
})
export class ConfigTablasComponent implements OnInit{

  constructor(private activosService: ActivosService){}

  confidencialidad: any[] = [];
  integridad: any[] = [];
  disponibilidad: any[] = [];
  proceso: any[] = [];
  tipodeactivo: any[] = [];
  datospersonales: any[] = [];
  custodio: any[] = [];
  duenodeactivo: any[] = [];

  criticidad: any[] = [];

  

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

    //Cargar datos de criticidad
    this.activosService.getCriticidad().subscribe(data => {
      this.criticidad = data;
    })
  }

}

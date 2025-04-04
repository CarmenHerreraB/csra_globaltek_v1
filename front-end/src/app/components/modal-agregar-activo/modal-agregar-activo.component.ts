import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
import { ActivosService } from '../../services/activos.service';

@Component({
  selector: 'app-modal-agregar-activo',
  standalone: false,
  templateUrl: './modal-agregar-activo.component.html',
  styleUrl: './modal-agregar-activo.component.css'
})
export class ModalAgregarActivoComponent implements OnInit{
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  confidencialidad: any[] = [];
  integridad: any[] = [];
  disponibilidad: any[] = [];
  criticidad: any[] = [];

  constructor(private activosService: ActivosService){}
  
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
  }

  closeModal() {
    this.close.emit(); // Notifica al padre que el modal se cerró
  }
}

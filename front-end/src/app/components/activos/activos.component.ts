import { Component } from '@angular/core';

@Component({
  selector: 'app-activos',
  standalone: false,
  templateUrl: './activos.component.html',
  styleUrl: './activos.component.css'
})
export class ActivosComponent {
  datos = [
    {
      id: 1, nombreActivo: 'Servidor A', proceso: 'TI', tipo: 'Hardware',
      descripcion: 'Servidor principal', confidencialidad: 'Alta',
      integridad: 'Media', disponibilidad: 'Alta', valor: '10000',
      criticidad: 'Alta', datosPersonales: 'Sí', dueno: 'Admin TI',
      custodio: 'Infraestructura'
    },
    {
      id: 2, nombreActivo: 'Servidor A', proceso: 'TI', tipo: 'Hardware',
      descripcion: 'Servidor principal', confidencialidad: 'Alta',
      integridad: 'Media', disponibilidad: 'Alta', valor: '10000',
      criticidad: 'Alta', datosPersonales: 'Sí', dueno: 'Admin TI',
      custodio: 'Infraestructura'
    },
    {
      id: 3, nombreActivo: 'Servidor A', proceso: 'TI', tipo: 'Hardware',
      descripcion: 'Servidor principal', confidencialidad: 'Alta',
      integridad: 'Media', disponibilidad: 'Alta', valor: '10000',
      criticidad: 'Alta', datosPersonales: 'Sí', dueno: 'Admin TI',
      custodio: 'Infraestructura'
    },
    {
      id: 4, nombreActivo: 'Servidor A', proceso: 'TI', tipo: 'Hardware',
      descripcion: 'Servidor principal', confidencialidad: 'Alta',
      integridad: 'Media', disponibilidad: 'Alta', valor: '10000',
      criticidad: 'Alta', datosPersonales: 'Sí', dueno: 'Admin TI',
      custodio: 'Infraestructura'
    },
  ];

  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}

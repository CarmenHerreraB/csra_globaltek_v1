import { Component, OnInit } from '@angular/core';
import { ActivosService } from '../../../services/activos.service';
import Swal from 'sweetalert2'; //Alertas 


@Component({
  selector: 'app-activos',
  standalone: false,
  templateUrl: './activos.component.html',
  styleUrl: './activos.component.css'
})
export class ActivosComponent implements OnInit{

  activos: any[] = [];

  constructor(private activosService: ActivosService){
  }

  ngOnInit(): void {
    this.cargarActivosDinamicamente();
  }

  //Metodo para traer los datos de activos 
  cargarActivosDinamicamente() {
    let id = 1;
    let erroresConsecutivos = 0;
    const maxErrores = 10;
  
    const cargarSiguiente = () => {
      this.activosService.getActivo(id).subscribe({
        next: (data) => {
          this.activos.push(data);
          id++;
          erroresConsecutivos = 0; // reinicia errores si encontró uno válido
          cargarSiguiente();       // sigue al siguiente
        },
        error: (err) => {
          if (err.status === 404) {
            erroresConsecutivos++;
            if (erroresConsecutivos < maxErrores) {
              id++;
              cargarSiguiente();  // sigue intentando
            }
          } else {
            console.error("Error inesperado:", err);
          }
        }
      });
    };
  
    cargarSiguiente(); // inicia la búsqueda
  }
  

  //Para funcionamiento del modal de agregar activos
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  //Para el funcionamiento del modal de actualizar activos 
  activoSeleccionado: any;
  showUpdateModal: boolean = false;

  openUpdateModal(activo: any) {
    console.log(activo);
    this.activoSeleccionado = activo;
    this.showUpdateModal = true;
  }

  closeUpdateModal(){
    this.showUpdateModal = false;
    this.activoSeleccionado = null;
  }

  //metodo para consumir el servicio para eliminar y mostrar alerta
  eliminarActivo(activo: any): void {
    Swal.fire({
      title: `¿Eliminar "${activo.nombre}"?`,
      text: `¿Está seguro de eliminar el activo "${activo.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#DC3545',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.activosService.deleteActivo(activo.id).subscribe({
          next: () => {
            this.activos = this.activos.filter(a => a.id !== activo.id);
            Swal.fire(
              '¡Eliminado!',
              `El activo "${activo.nombre}" ha sido eliminado.`,
              'success'
            );
          },
          error: () => {
            Swal.fire(
              'Error',
              `No se pudo eliminar el activo "${activo.nombre}".`,
              'error'
            );
          }
        });
      }
    });
  }
  
  
}

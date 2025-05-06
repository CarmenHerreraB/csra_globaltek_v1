import { Component, OnInit } from '@angular/core';
import { ActivosService } from '../../../services/activos.service';
import { ConfigTablasService } from '../../../services/config-tablas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-tablas',
  standalone: false,
  templateUrl: './config-tablas.component.html',
  styleUrl: './config-tablas.component.css'
})
export class ConfigTablasComponent implements OnInit{

  constructor(private activosService: ActivosService, private cofigTablasServices: ConfigTablasService){}

  confidencialidad: any[] = [];
  integridad: any[] = [];
  disponibilidad: any[] = [];
  proceso: any[] = [];
  tipodeactivo: any[] = [];
  datospersonales: any[] = [];
  custodio: any[] = [];
  duenodeactivo: any[] = [];

  criticidad: any[] = [];

  //Inicializacion nuevos datos en las tablas
  nuevoTipoActivo: string = '';
  nuevoProceso: string = '';
  nuevoCustodio: string = '';
  nuevoDatosPersonales: string = '';
  nuevoDuenoActivo: string = '';


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

  //Agregar nuevo dato en tipo de activos 
  agregarNuevoTipoActivo() {
    if (this.nuevoTipoActivo.trim()) {
      const data = { nombre: this.nuevoTipoActivo };
      this.cofigTablasServices.agregarTipoActivo(data).subscribe({
        next: (respuesta) => {
          console.log('Tipo de activo agregado:', respuesta);
          this.tipodeactivo.push(respuesta); // actualizar la tabla
          this.nuevoTipoActivo = ''; // limpiar el input
        },
        error: (error) => {
          console.error('Error al agregar tipo de activo:', error);
        }
      });
    }
  }

  //Eliminar datos de tipo de activos 
  eliminar(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el tipo de activo "${item.nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#DC3545',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cofigTablasServices.eliminarTipoActivo(item.id).subscribe({
          next: () => {
            this.tipodeactivo = this.tipodeactivo.filter(t => t.id !== item.id);
            Swal.fire('Eliminado', 'El tipo de activo ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el tipo de activo.', 'error');
          }
        });
      }
    });
  }
  
  //Agregar nuevo dato en proceso
  agregarNuevoProceso() {
    if (this.nuevoProceso.trim()) {
      const data = { nombre: this.nuevoProceso };
      this.cofigTablasServices.agregarProceso(data).subscribe({
        next: (respuesta) => {
          console.log('Proceso agregado:', respuesta);
          this.proceso.push(respuesta); // actualizar la tabla
          this.nuevoProceso = ''; // limpiar el input
        },
        error: (error) => {
          console.error('Error al agregar tipo de activo:', error);
        }
      });
    }
  }

  //Eliminar datos de tipo de activos 
  eliminarProceso(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el proceso "${item.nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#DC3545',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cofigTablasServices.eliminarProceso(item.id).subscribe({
          next: () => {
            this.proceso = this.proceso.filter(t => t.id !== item.id);
            Swal.fire('Eliminado', 'El proceso ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el proceso.', 'error');
          }
        });
      }
    });
  }

  //Agregar nuevo dato en Responsable/Custodio
  agregarNuevoCustodio() {
    if (this.nuevoCustodio.trim()) {
      const data = { nombre: this.nuevoCustodio };
      this.cofigTablasServices.agregarResponsable(data).subscribe({
        next: (respuesta) => {
          console.log('Proceso agregado:', respuesta);
          this.custodio.push(respuesta); // actualizar la tabla
          this.nuevoCustodio = ''; // limpiar el input
        },
        error: (error) => {
          console.error('Error al agregar tipo de activo:', error);
        }
      });
    }
  }

  //Eliminar datos de tipo de activos 
  eliminarCustodio(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el proceso "${item.nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#DC3545',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cofigTablasServices.eliminarResponsable(item.id).subscribe({
          next: () => {
            this.custodio = this.custodio.filter(t => t.id !== item.id);
            Swal.fire('Eliminado', 'El proceso ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el proceso.', 'error');
          }
        });
      }
    });
  }

  //Agregar nuevo dato en Datos Personales
  agregarNuevoDatosPersonales() {
    if (this.nuevoDatosPersonales.trim()) {
      const data = { nombre: this.nuevoDatosPersonales };
      this.cofigTablasServices.agregarDatosPersonales(data).subscribe({
        next: (respuesta) => {
          console.log('Proceso agregado:', respuesta);
          this.datospersonales.push(respuesta); // actualizar la tabla
          this.nuevoDatosPersonales = ''; // limpiar el input
        },
        error: (error) => {
          console.error('Error al agregar tipo de activo:', error);
        }
      });
    }
  }

  //Eliminar datos de datos personales
  eliminarDatosPersonales(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el proceso "${item.nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#DC3545',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cofigTablasServices.eliminarDatosPersonales(item.id).subscribe({
          next: () => {
            this.datospersonales = this.datospersonales.filter(t => t.id !== item.id);
            Swal.fire('Eliminado', 'El proceso ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el proceso.', 'error');
          }
        });
      }
    });
  }

  //Agregar nuevo dato en Dueño de Activo
  agregarNuevoDuenoActivo() {
    if (this.nuevoDuenoActivo.trim()) {
      const data = { nombre: this.nuevoDuenoActivo };
      this.cofigTablasServices.agregarDuenoActivo(data).subscribe({
        next: (respuesta) => {
          console.log('Proceso agregado:', respuesta);
          this.duenodeactivo.push(respuesta); // actualizar la tabla
          this.nuevoDuenoActivo = ''; // limpiar el input
        },
        error: (error) => {
          console.error('Error al agregar tipo de activo:', error);
        }
      });
    }
  }

  //Eliminar datos de dueño activo
  eliminarDuenoActivo(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el proceso "${item.nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#DC3545',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cofigTablasServices.eliminarDuenoActivo(item.id).subscribe({
          next: () => {
            this.duenodeactivo = this.duenodeactivo.filter(t => t.id !== item.id);
            Swal.fire('Eliminado', 'El proceso ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el proceso.', 'error');
          }
        });
      }
    });
  }
}

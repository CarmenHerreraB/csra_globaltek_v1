import { Component, OnInit } from '@angular/core';
import { ActivosService } from '../../../services/activos.service';
import { ConfigTablasService } from '../../../services/config-tablas.service';
import Swal from 'sweetalert2';
import { color } from 'chart.js/helpers';

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


  nuevoEstadoConfidencialidad: string = '';
  nuevoValorConfidencialidad: string = '';
  nuevoColorConfidencialidad: string = '';

  nuevoEstadoIntegridad: string = '';
  nuevoValorIntegridad: string = '';
  nuevoColorIntegridad: string = '';


  nuevoEstadoDisponibilidad: string = '';
  nuevoValorDisponibilidad: string = '';
  nuevoColorDisponibilidad: string = '';


  ngOnInit(): void {
    //Cargar datos de confidencialidad
    this.activosService.getConfidencialidad().subscribe(data => { 
      this.confidencialidad = data.filter((item: any) => item.estadoCriterio === 'activo');
    });
    
    //Cargar datos de Integridad
    this.activosService.getIntegridad().subscribe(data => { 
      this.integridad = data.filter((item: any) => item.estadoCriterio === 'activo');
    });

    //Cargar datos de Disponibilidad
    this.activosService.getDisponibilidad().subscribe(data => { 
      this.disponibilidad = data.filter((item: any) => item.estadoCriterio === 'activo');
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

  
  agregarNuevaConfidencialidad() {
    if (this.nuevoEstadoConfidencialidad.trim() && this.nuevoValorConfidencialidad.trim()) {
      const data = {
        estado: this.nuevoEstadoConfidencialidad,
        valor: this.nuevoValorConfidencialidad,
        color: this.nuevoColorConfidencialidad
      };
  
      this.cofigTablasServices.agregarCofidencialidad(data).subscribe({
        next: (respuesta) => {
          console.log('Confidencialidad agregada:', respuesta);
          this.confidencialidad.push(respuesta);
          // Limpiar los inputs
          this.nuevoEstadoConfidencialidad = '';
          this.nuevoValorConfidencialidad = '';
          this.nuevoColorConfidencialidad = '';
        },
        error: (error) => {
          console.error('Error al agregar confidencialidad:', error);
          Swal.fire('Error', 'No se pudo agregar la confidencialidad.', 'error');
        }
      });
    } else {
      Swal.fire('Advertencia', 'Debe completar todos los campos.', 'warning');
    }
  }

  //Eliminar datos de confidencialidad
  eliminarConfidencialidad(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará la cartegoria "${item.estado}" de confidencialidad`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#DC3545',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cofigTablasServices.eliminarConfidencialidad(item.id).subscribe({
          next: () => {
            this.confidencialidad = this.confidencialidad.filter(t => t.id !== item.id);
            Swal.fire('Eliminado', 'La categoria ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la categoria de confidencialidad.', 'error');
          }
        });
      }
    });
  }

  agregarNuevaIntegridad(){
    if (this.nuevoEstadoIntegridad.trim() && this.nuevoValorIntegridad.trim()){
      const data ={
        estado: this.nuevoEstadoIntegridad,
        valor: this.nuevoValorIntegridad,
        color: this.nuevoColorIntegridad
      };
      this.cofigTablasServices.agregarIntegridad(data).subscribe({
        next: (respuesta) => {
          console.log('Integridad agregada:', respuesta);
          this.integridad.push(respuesta);

          //Limpiar los inputs 
          this.nuevoEstadoIntegridad = '';
          this.nuevoValorIntegridad = '';
          this.nuevoColorIntegridad = '';
        },
        error: (error) => {
          console.error('Error al agregar integridad', error);
          Swal.fire('Error', 'No se pudo agregar la integridad', 'error');
        }
      });
    }else {
      Swal.fire('Advertencia', 'Debe completar todos los campos', 'warning');
    }
  }

  //Eliminar datos de integridad
  eliminarIntegridad(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará la cartegoria "${item.estado}" de integridad`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#DC3545',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cofigTablasServices.eliminarIntegridad(item.id).subscribe({
          next: () => {
            this.integridad = this.integridad.filter(t => t.id !== item.id);
            Swal.fire('Eliminado', 'La categoria ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la categoria de integridad.', 'error');
          }
        });
      }
    });
  }

  agregarNuevoDisponibilidad(){
    if(this.nuevoEstadoDisponibilidad.trim() && this.nuevoValorDisponibilidad){
      const data = {
        estado: this.nuevoEstadoDisponibilidad,
        valor: this.nuevoValorDisponibilidad,
        color: this.nuevoColorDisponibilidad
      };
      this.cofigTablasServices.agregarDisponibilidad(data).subscribe({
        next: (respuesta) => {
          console.log('Disponibilidad agregada', respuesta);
          this.disponibilidad.push(respuesta);

          //Limpiar campos
          this.nuevoEstadoDisponibilidad = '';
          this.nuevoValorDisponibilidad = '';
          this.nuevoColorDisponibilidad = '';
        },
        error: (error) => {
          console.error('Error al agregar disponibilidad', error);
          Swal.fire('Error', 'No se pudo agregar la disponibilidad', 'error');
        }
      });
    }else {
      Swal.fire('Advertencia', 'Debe completar todos los campos', 'warning')
    }
  }

  //Eliminar datos de disponibilidad
  eliminarDisponibilidad(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará la cartegoria "${item.estado}" de disponibilidad`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#DC3545',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cofigTablasServices.eliminarDisponibilidad(item.id).subscribe({
          next: () => {
            this.disponibilidad = this.disponibilidad.filter(t => t.id !== item.id);
            Swal.fire('Eliminado', 'La categoria ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la categoria de disponibilidad.', 'error');
          }
        });
      }
    });
  }

  //Metodos para restablecer las tablas a sus datos por defecto

  restablecerTipoAtivo() {
    this.cofigTablasServices.defectoTipoDeActivo().subscribe({
      next: () => {
        // Volver a cargar los datos actualizados
        this.activosService.getTipoDeActivo().subscribe(data => {
          this.tipodeactivo = data;
          Swal.fire('Restaurado', 'Se han restaurado los tipos de activos por defecto.', 'success');
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo restaurar los valores por defecto.', 'error');
      }
    });
  }

  restablecerProceso() {
    this.cofigTablasServices.defectoProceso().subscribe({
      next: () => {
        // Volver a cargar los datos actualizados
        this.activosService.getProceso().subscribe(data => {
          this.proceso = data;
          Swal.fire('Restaurado', 'Se han restaurado los tipos de activos por defecto.', 'success');
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo restaurar los valores por defecto.', 'error');
      }
    });
  }
  
  restablecerCustodio() {
    this.cofigTablasServices.defectoCustodio().subscribe({
      next: () => {
        // Volver a cargar los datos actualizados
        this.activosService.getCustodio().subscribe(data => {
          this.custodio = data;
          Swal.fire('Restaurado', 'Se han restaurado los tipos de activos por defecto.', 'success');
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo restaurar los valores por defecto.', 'error');
      }
    });
  }

  restablecerDatosPersonales() {
    this.cofigTablasServices.defectoDatosPersonales().subscribe({
      next: () => {
        // Volver a cargar los datos actualizados
        this.activosService.getCustodio().subscribe(data => {
          this.datospersonales = data;
          Swal.fire('Restaurado', 'Se han restaurado los tipos de activos por defecto.', 'success');
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo restaurar los valores por defecto.', 'error');
      }
    });
  }

  restablecerDuenoActivo() {
    this.cofigTablasServices.defectoDuenoActivo().subscribe({
      next: () => {
        // Volver a cargar los datos actualizados
        this.activosService.getDuenoDelActivo().subscribe(data => {
          this.duenodeactivo = data;
          Swal.fire('Restaurado', 'Se han restaurado los tipos de activos por defecto.', 'success');
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo restaurar los valores por defecto.', 'error');
      }
    });
  }

  restablecerConfidencialidad() {
    this.cofigTablasServices.defectoConfidencialidad().subscribe({
      next: () => {
        // Volver a cargar los datos actualizados
        this.activosService.getConfidencialidad().subscribe(data => {
          this.confidencialidad = data;
          Swal.fire('Restaurado', 'Se han restaurado las categorias por defecto de confidencialidad.', 'success');
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo restaurar los valores por defecto.', 'error');
      }
    });
  }

  restablecerIntegridad() {
    this.cofigTablasServices.defectoIntegridad().subscribe({
      next: () => {
        // Volver a cargar los datos actualizados
        this.activosService.getIntegridad().subscribe(data => {
          this.integridad = data;
          Swal.fire('Restaurado', 'Se han restaurado las categorias por defecto de confidencialidad.', 'success');
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo restaurar los valores por defecto.', 'error');
      }
    });
  }

  restablecerDisponibilidad() {
    this.cofigTablasServices.defectoDisponibilidad().subscribe({
      next: () => {
        // Volver a cargar los datos actualizados
        this.activosService.getDisponibilidad().subscribe(data => {
          this.disponibilidad = data;
          Swal.fire('Restaurado', 'Se han restaurado las categorias por defecto de confidencialidad.', 'success');
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo restaurar los valores por defecto.', 'error');
      }
    });
  }


  actualizarConfidencialidad(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Vas a actualizar esta confidencialidad!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#DC3545',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cofigTablasServices.updateConfidencialidad(item).subscribe({
          next: (response) => {
            Swal.fire(
              '¡Actualizado!',
              'La confidencialidad ha sido actualizada correctamente.',
              'success'
            );
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'Hubo un problema al actualizar la confidencialidad.',
              'error'
            );
            console.error(error);
          }
        });
      }
    });
  }

  actualizarIntegridad(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Vas a actualizar esta integridad!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#DC3545',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cofigTablasServices.updateIntegridad(item).subscribe({
          next: (response) => {
            Swal.fire(
              '¡Actualizado!',
              'La integridad ha sido actualizada correctamente.',
              'success'
            );
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'Hubo un problema al actualizar la confidencialidad.',
              'error'
            );
            console.error(error);
          }
        });
      }
    });
  }

  actualizarDisponibilidad(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Vas a actualizar esta disponibilidad!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#DC3545',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cofigTablasServices.updateDisponibilidad(item).subscribe({
          next: (response) => {
            Swal.fire(
              '¡Actualizado!',
              'La confidencialidad ha sido actualizada correctamente.',
              'success'
            );
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'Hubo un problema al actualizar la confidencialidad.',
              'error'
            );
            console.error(error);
          }
        });
      }
    });
  }
}

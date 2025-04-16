import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, HostListener} from '@angular/core';
import { ActivosService } from '../../../services/activos.service';
import Swal from 'sweetalert2'; // Alertas

@Component({
  selector: 'app-activos',
  standalone: false,
  templateUrl: './activos.component.html',
  styleUrl: './activos.component.css'
})
export class ActivosComponent implements OnInit, AfterViewInit {
  //Centrado tabla y boton
  @ViewChild('centerRef') centerRef!: ElementRef;
  @ViewChild('tableRef') tableRef!: ElementRef;

  isOverlapping: boolean = false;

  ngAfterViewInit() {
    this.checkOverlap();
  }

  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  checkOverlap() {
    const centerRect = this.centerRef.nativeElement.getBoundingClientRect();
    const tableRect = this.tableRef.nativeElement.getBoundingClientRect();

    const overlap = !(centerRect.bottom < tableRect.top || 
                      centerRect.top > tableRect.bottom ||
                      centerRect.right < tableRect.left ||
                      centerRect.left > tableRect.right);

    this.isOverlapping = overlap;

    console.log('¿Está superponiéndose?:', this.isOverlapping);
  }

  

  activos: any[] = [];

  // Control de modal para agregar activos
  showModal: boolean = false;

  // Control de modal para actualizar activos
  showUpdateModal: boolean = false;
  activoSeleccionado: any;

  constructor(private activosService: ActivosService) {}

  ngOnInit(): void {
    this.cargarActivosDinamicamente();
    setTimeout(() => {
      this.checkOverlap();
    }, 100);
  }

  // Método actualizado para obtener todos los activos
  cargarActivosDinamicamente() {
    this.activosService.getActivo().subscribe({
      next: (data: any) => {
        this.activos = data;
        console.log(this.activos)
      },
      error: (err) => {
        console.error("Error al obtener activos:", err);
        Swal.fire(
          'Error',
          'Hubo un problema al cargar los activos.',
          'error'
        );
      }
    });
  }

  


  //Aplicar colores segun id para campos de criterios de clasificación
  getColorConfidencialidad(id: number): string{
    switch (id) {
      case 1:
        return 'red-color';
      default: 
        return '';
    }
  }

  getColor(id: number): string{
    switch (id) {
      case 1:
        return 'red-color';
      case 2: 
        return 'yellow-color';
      case 3:
        return 'green-color';
      default: 
        return '';
    }
  }

  // Abrir y cerrar modal para agregar
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // Abrir y cerrar modal de actualización
  openUpdateModal(activo: any) {
    console.log(activo);
    this.activoSeleccionado = activo;
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
    this.activoSeleccionado = null;
  }

  
  // Método para eliminar activo con confirmación
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

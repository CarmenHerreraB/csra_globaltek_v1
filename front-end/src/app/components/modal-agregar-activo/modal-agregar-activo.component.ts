import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-modal-agregar-activo',
  standalone: false,
  templateUrl: './modal-agregar-activo.component.html',
  styleUrl: './modal-agregar-activo.component.css'
})
export class ModalAgregarActivoComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit(); // Notifica al padre que el modal se cerró
  }
}

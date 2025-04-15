import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion-activos',
  standalone: false,
  templateUrl: './configuracion-activos.component.html',
  styleUrl: './configuracion-activos.component.css'
})
export class ConfiguracionActivosComponent {
  seleccionado: string = 'formulas'; //Inicialmente nada selecionado

  mostrar(opcion: string){
    this.seleccionado = opcion;
  }

}

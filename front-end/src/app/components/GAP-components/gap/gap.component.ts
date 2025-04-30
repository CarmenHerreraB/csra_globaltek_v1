import { Component } from '@angular/core';

@Component({
  selector: 'app-gap',
  standalone: false,
  templateUrl: './gap.component.html',
  styleUrl: './gap.component.css'
})
export class GapComponent {
  seleccionado: string = 'preguntas'; //Inicialmente muestra preguntas 

  mostrar(opcion: string){
    this.seleccionado = opcion;
  }
}

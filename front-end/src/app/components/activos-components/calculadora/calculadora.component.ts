import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  standalone: false,
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {
  formula: string = '';

  appendToFormula(value: string): void {
    this.formula += value;
  }

  clearFormula(): void {
    this.formula = '';
  }

  calculateFormula(): void {
    try {
      // Usar eval con precaución. Solo para fines demostrativos.
      this.formula = eval(this.formula).toString();
    } catch (e) {
      this.formula = 'Error';
    }
  }
}

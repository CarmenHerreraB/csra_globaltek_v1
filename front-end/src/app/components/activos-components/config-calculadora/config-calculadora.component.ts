import { Component } from '@angular/core';
import { CalculatorService } from '../../../services/calculator.service';

@Component({
  selector: 'app-config-calculadora',
  standalone: false,
  templateUrl: './config-calculadora.component.html',
  styleUrl: './config-calculadora.component.css'
})
export class ConfigCalculadoraComponent {
  formula = '';
  result: number | null = null;
  error: string | null = null;

  constructor(private calculatorService: CalculatorService) {}

  appendToFormula(value: string): void {
    this.formula += value;
  }

  clearFormula(): void {
    this.formula = '';
    this.result = null;
    this.error = null;
  }

  calculateFormula(): void {
    if (!this.formula.trim()) {
      this.error = 'Por favor, ingresa una fórmula.';
      return;
    }

    this.calculatorService.calculateExpression(this.formula).subscribe({
      next: (response) => {
        if (response.Result !== undefined) {
          this.result = response.Result;
          this.formula = String(this.result); // para continuar calculando
          this.error = null;
        } else {
          this.result = null;
          this.error = response.error ?? 'Error desconocido';
        }
      },
      error: (err) => {
        this.result = null;
        this.error = 'Error en la formula';
        console.error(err);
      }
    });
  }
}

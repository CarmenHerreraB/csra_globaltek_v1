import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../../services/calculator.service';
import Swal from 'sweetalert2'; // Alertas

@Component({
  selector: 'app-config-calculadora',
  standalone: false,
  templateUrl: './config-calculadora.component.html',
  styleUrl: './config-calculadora.component.css'
})
export class ConfigCalculadoraComponent implements OnInit{
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

  //Agragra formulas
  agregarFormula(): void {
    if (!this.formula.trim()) {
      this.error = 'La fórmula está vacía';
      return;
    }

    this.calculatorService.agregarFormulas({ formula: this.formula }).subscribe({
      next: (respuesta) => {
        console.log('Fórmula agregada correctamente:', respuesta);
        this.clearFormula(); // limpia después de agregar
        this.cargarFormulas();
      },
      error: (err) => {
        console.error('Error al agregar la fórmula:', err);
        this.error = 'Error formula ya existente';
      }
    });
  }

  ngOnInit(): void {
    this.cargarFormulas();
  }

  formulas: any[] = [];

  //Cargar formulas 
  cargarFormulas() {
    this.calculatorService.getFormulas().subscribe({
      next: (data: any) => {
        this.formulas = data;
        console.log(this.formulas)
      },
      error: (err) => {
              console.error("Error al obtener formulas:", err);
              Swal.fire(
                'Error',
                'Hubo un problema al cargar las formulas.',
                'error'
              );
            }
    })
  }

  //Activar y desactivar formulas
  activarFormula(id: number): void {
    this.calculatorService.activarFormula(id).subscribe({
      next: () => {
        Swal.fire('Activada', 'La fórmula ha sido activada correctamente.', 'success');
        this.cargarFormulas(); // recarga para actualizar visualmente cuál está activa
      },
      error: (err) => {
        console.error('Error al activar la fórmula:', err);
        Swal.fire('Error', 'No se pudo activar la fórmula.', 'error');
      }
    });
  }

  onSeleccionarFormula(f: any): void {
    this.formula = f.formula;
    this.activarFormula(f.id); // ← corregido
  }


  //Metodo para eliminar formula 
  eliminarFormula(f: any): void {
    Swal.fire({
      title: `¿Eliminar "${f.formula}"?`,
      text: `¿Está seguro de eliminar la formula "${f.formula}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#DC3545',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed){
        this.calculatorService.eliminarFormula(f.id).subscribe({
          next: () => {
            this.cargarFormulas();
            this.formulas = this.formulas.filter(f => f.id !== f.id);
            Swal.fire(
              '¡Eliminado!',
              `La formula "${f.formula}" ha sido eliminado.`,
              'success'
            );
          }, 
          error: () => {
            Swal.fire(
              'Error',
              `No se pudo eliminar la formula"${f.formula}".`,
              'error'
            );
          }
        })
      }

    })
  }

}

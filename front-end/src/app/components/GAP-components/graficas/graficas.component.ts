import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas',
  standalone: false,
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css'
})
export class GraficasComponent{ 
  public radarChartLabels: string[] = ['Velocidad', 'Fuerza', 'Resistencia', 'Técnica', 'Táctica', 'Mentalidad'];

  public radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: this.radarChartLabels,
    datasets: [
      { data: [65, 59, 90, 81, 56, 55], label: 'Atleta A' },
      { data: [28, 48, 40, 19, 96, 27], label: 'Atleta B' }
    ]
  };

  public radarChartType: 'radar' = 'radar';

  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: false,
    elements: {
      line: {
        borderWidth: 2
      }
    }
  };
}

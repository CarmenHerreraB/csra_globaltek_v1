import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas',
  standalone: false,
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css'
})
export class GraficasComponent{ 
  public radarChartLabels: string[] = ['Controles Organizacionales', 'Controles tecnológicos', 'Controles Físicos', 'Controles de personas'];

  public radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: this.radarChartLabels,
    datasets: [
      { data: [20, 30, 70, 80], 
        label: 'Estado actual',
        backgroundColor: 'rgba(176, 217, 255, 0.6)',
        borderColor: 'rgb(91, 154, 213)',
        pointBackgroundColor:  'rgb(91, 154, 213)',
      },
      { data: [100, 100, 100, 100],
        label: 'Estado deseado',
        backgroundColor: 'transparent',
        borderColor: 'rgb(237, 124, 49)',
        pointBackgroundColor: 'rgb(237, 124, 49)',
      }
    ]
  };

  public radarChartType: 'radar' = 'radar';

  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,  // 👈 importante para controlar el alto manualmente
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          color: '#000'
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2
      }
    }
  };
}

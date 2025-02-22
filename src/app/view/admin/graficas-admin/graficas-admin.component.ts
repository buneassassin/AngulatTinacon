import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-graficas-admin',
  // Asegúrate de usar styleUrls (con "s")
  templateUrl: './graficas-admin.component.html',
  styleUrls: ['./graficas-admin.component.css']
})
export class GraficasAdminComponent implements AfterViewInit {
  @ViewChild('tinacosChart') tinacosChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('usuariosChart') usuariosChart!: ElementRef<HTMLCanvasElement>;

  tinacosChartInstance!: Chart;
  usuariosChartInstance!: Chart;

  ngAfterViewInit(): void {
    // Gráfico para Tinacos: muestra el nivel de agua a lo largo de los meses.
    this.tinacosChartInstance = new Chart(this.tinacosChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Nivel de agua (%)',
          data: [65, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: '#007bff',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Gráfico para Usuarios: muestra nuevos registros mensuales.
    this.usuariosChartInstance = new Chart(this.usuariosChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Nuevos usuarios',
          data: [30, 45, 28, 50, 40, 60],
          backgroundColor: '#28a745',
          borderColor: '#28a745',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}

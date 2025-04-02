import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HeaderComponent } from '../../../Components/header/header.component';
import { AdminService } from '../../../Services/admin/admin.service';

@Component({
  selector: 'app-graficas-admin',
  imports: [HeaderComponent],
  templateUrl: './graficas-admin.component.html',
  styleUrls: ['./graficas-admin.component.css'],
})
export class GraficasAdminComponent implements AfterViewInit {
  estadisticaUseres: any;
  @ViewChild('usuariosChart') usuariosChart!: ElementRef<HTMLCanvasElement>;
  usuariosChartInstance!: Chart;

  constructor(private adminService: AdminService) {}

  ngAfterViewInit(): void {
    this.adminService.getUserStatistics().subscribe({
      next: (response: any) => {
        this.estadisticaUseres = response;
        this.renderChart();
      },
      error: (error) => {
        //console.error('Error al obtener datos del usuario', error),
      },
    });
  }

  renderChart(): void {
    // Extraemos los datos de usuarios activos e inactivos
    const data = [
      this.estadisticaUseres.activeUsers,
      this.estadisticaUseres.inactiveUsers,
    ];
    const labels = ['Usuarios Activos', 'Usuarios Inactivos'];

    this.usuariosChartInstance = new Chart(this.usuariosChart.nativeElement, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Estado de Usuarios',
            data: data,
            backgroundColor: ['#28a745', '#dc3545'],
            borderColor: ['#28a745', '#dc3545'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}

// Gráfico para Tinacos: muestra el nivel de agua a lo largo de los meses.
/*this.tinacosChartInstance = new Chart(this.tinacosChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Nivel de agua (%)',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: '#007bff',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });*/

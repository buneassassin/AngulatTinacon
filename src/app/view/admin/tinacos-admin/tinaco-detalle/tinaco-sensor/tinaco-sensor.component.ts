import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../../Components/header/header.component';
import { SensoresServicioService } from '../../../../../Services/tinaco/tinaco_indiv/sensores-servicio.service';
import { LoadingSkeletonComponent } from '../../../../../Components/loading-skeleton/loading-skeleton.component';
import { Tinacos } from '../../../../../Interface/Tinacon/tinacos';
import { ActivatedRoute } from '@angular/router';
import { SensorHistorial } from '../../../../../Interface/sensor/sensor';

@Component({
  selector: 'app-tinaco-sensor',
  imports: [CommonModule, HeaderComponent, LoadingSkeletonComponent],
  templateUrl: './tinaco-sensor.component.html',
  styleUrl: './tinaco-sensor.component.css',
})
export class TinacoSensorComponent implements OnInit {
  info: Record<string, SensorHistorial> = {};
  isLoading: boolean = true;
  constructor(
    private sensoresService: SensoresServicioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const tinacoId = params['id'];
      const sensorId = params['sensorId']; // Nuevo parámetro
      console.log(`ID del tinaco: ${tinacoId}`);
      console.log(`ID del sensor: ${sensorId}`);

      this.getHistory(Number(tinacoId), Number(sensorId));
    });
  }

  getHistory(id_tinaco: number, id_sensor: number): void {
    this.sensoresService
      .getReporte({ tinaco_id: id_tinaco, sensor_id: id_sensor })
      .subscribe({
        next: (response: any) => {
          this.info = response.data || {}; // Asegúrate de que sea un objeto
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al obtener historial:', error);
          this.isLoading = false;
        },
      });
  }

  goBack(): void {
    window.history.back();
  }
}

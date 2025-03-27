import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { HeaderComponent } from '../../../../../Components/header/header.component';
import { SensoresServicioService } from '../../../../../Services/tinaco/tinaco_indiv/sensores-servicio.service';
import { LoadingSkeletonComponent } from '../../../../../Components/loading-skeleton/loading-skeleton.component';
import { Tinacos } from '../../../../../Interface/Tinacon/tinacos';
import { ActivatedRoute } from '@angular/router';
import { SensorHistorial } from '../../../../../Interface/sensor/sensor';
import { echo } from '../../../../../echo-config';

@Component({
  selector: 'app-tinaco-sensor',
  imports: [CommonModule, HeaderComponent, LoadingSkeletonComponent],
  templateUrl: './tinaco-sensor.component.html',
  styleUrls: ['./tinaco-sensor.component.css'],
})
export class TinacoSensorComponent implements OnInit {
  info: Record<string, SensorHistorial> = {};
  isLoading: boolean = true;
  private tinacoId!: string;
  private sensorId!: string;

  constructor(
    private sensoresService: SensoresServicioService,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tinacoId = params['id'];
      this.sensorId = params['sensorId'];
      console.log(`ID del tinaco: ${this.tinacoId}`);
      console.log(`ID del sensor: ${this.sensorId}`);

      this.getHistory(Number(this.tinacoId), Number(this.sensorId));
      this.setupEchoConnection(Number(this.tinacoId), Number(this.sensorId));
    });
  }

  getHistory(id_tinaco: number, id_sensor: number): void {
    this.sensoresService.getReporte({ tinaco_id: id_tinaco, sensor_id: id_sensor })
      .subscribe({
        next: (response: any) => {
          this.info = response.data || {};
          this.isLoading = false;
          console.log('Historial obtenido:', this.info);
        },
        error: (error) => {
          console.error('Error al obtener historial:', error);
          this.isLoading = false;
        },
      });
  }

  private setupEchoConnection(tinacoId: number, sensorId: number) {
    console.log('Conectando a Pusher...');
    const channelName = `.Sensor_${sensorId}_Data_${tinacoId}`;

    const subscribeToChannel = () => {
      const channel = echo.channel('reviews');
      console.log('Canal reviews suscrito');
      console.log('Escuchando en el canal:', channelName);
      channel.listen(channelName, (data: any) => {
        console.log(`Nueva data para sensor ${sensorId}:`, data);
        this.ngZone.run(() => {
          // Agregamos el nuevo registro usando created_at como llave
          this.info = {
            ...this.info,
            [data.sensor.created_at]: data.sensor,
          };
        });
      });
    };

    if (echo.connector.pusher.connection.state === 'connected') {
      console.log('Conectado a Pusher');
      subscribeToChannel();
    } else {
      echo.connector.pusher.connection.bind('connected', () => {
        console.log('Conectado a Pusher (después de bind)');
        subscribeToChannel();
      });
    }
  }

  // Comparador para ordenar por created_at (los más recientes primero)
  orderByCreatedAt(a: KeyValue<string, SensorHistorial>, b: KeyValue<string, SensorHistorial>): number {
    return new Date(b.value.created_at).getTime() - new Date(a.value.created_at).getTime();
  }

  goBack(): void {
    window.history.back();
  }
}

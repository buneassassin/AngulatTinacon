import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { HeaderComponent } from '../../../../../Components/header/header.component';
import { SensoresServicioService } from '../../../../../Services/tinaco/tinaco_indiv/sensores-servicio.service';
import { LoadingSkeletonComponent } from '../../../../../Components/loading-skeleton/loading-skeleton.component';
import { Tinacos } from '../../../../../Interface/Tinacon/tinacos';
import { ActivatedRoute } from '@angular/router';
import { SensorHistorial } from '../../../../../Interface/sensor/sensor';
import { echo } from '../../../../../echo-config';
import { PaginationComponent } from '../../../../../Components/pagination/pagination.component';

@Component({
  selector: 'app-tinaco-sensor',
  imports: [
    CommonModule,
    HeaderComponent,
    LoadingSkeletonComponent,
    PaginationComponent,
  ],
  templateUrl: './tinaco-sensor.component.html',
  styleUrls: ['./tinaco-sensor.component.css'],
})
export class TinacoSensorComponent implements OnInit {
  data: SensorHistorial[] = [];
  isLoading: boolean = true;
  tinacoId!: number;
  sensorId!: number;
  nombreSensor: string = '';
  // Variables de paginación
  pagination: any;
  pages: number[] = [];
  currentPage: number = 1;

  constructor(
    private sensoresService: SensoresServicioService,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tinacoId = params['id'];
      this.sensorId = Number(params['sensorId']); // Convertir a número
      //console.log(`ID del tinaco: ${this.tinacoId}`);
      //console.log(`ID del sensor: ${this.sensorId}`);
      if (this.sensorId === 1) {
        this.nombreSensor = 'Ultrasonico';
      } else if (this.sensorId === 2) {
        this.nombreSensor = 'Temperatura';
      } else if (this.sensorId === 3) {
        this.nombreSensor = 'PH';
      } else if (this.sensorId === 4) {
        this.nombreSensor = 'Turbidez';
      } else if (this.sensorId === 5) {
        this.nombreSensor = 'TDS';
      }
      this.getHistory(Number(this.tinacoId), this.sensorId, this.currentPage);
      this.setupEchoConnection(Number(this.tinacoId), this.sensorId);
    });
  }
  getBorderColor(item: SensorHistorial): string {
    const value = parseFloat(item.valor);
    switch (this.sensorId) {
      case 1: // Ultrasonico: mayor valor indica menor nivel de agua.
        if (value > 15) return '#dc3545'; // Malo (rojo)
        if (value > 10) return '#ffc107'; // Medio (amarillo)
        return '#28a745'; // Bueno (verde)
      case 2: // Temperatura: valores muy altos o muy bajos son críticos.
        if (value > 35 || value < 15) return '#dc3545';
        if (value >= 15 && value <= 25) return '#28a745';
        return '#ffc107';
      case 3: // pH: lo ideal es 7, con tolerancia de ±1 para bueno.
        if (Math.abs(value - 7) > 2) return '#dc3545';
        if (Math.abs(value - 7) > 1) return '#ffc107';
        return '#28a745';
      case 4: // Turbidez: mientras menor, mejor.
        if (value > 100) return '#dc3545';
        if (value > 50) return '#ffc107';
        return '#28a745';
      case 5: // TDS: niveles altos pueden indicar problemas.
        if (value > 500) return '#dc3545';
        if (value > 300) return '#ffc107';
        return '#28a745';
      default:
        return '#007bff';
    }
  }

  getHistory(id_tinaco: number, id_sensor: number, page: number): void {
    this.sensoresService
      .getReporte({ tinaco_id: id_tinaco, sensor_id: id_sensor }, page)
      .subscribe({
        next: (response: any) => {
          // Ordena el arreglo para que los registros más nuevos aparezcan primero.
          this.data = response.data.sort(
            (a: SensorHistorial, b: SensorHistorial) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          this.pagination = response.pagination;
          this.currentPage = this.pagination.current_page;
          this.pages = Array.from(
            { length: this.pagination.last_page },
            (_, i) => i + 1
          );
          this.isLoading = false;
        },

        error: (error) => {
          //console.error('Error al obtener historial:', error);
          this.isLoading = false;
        },
      });
  }

  private setupEchoConnection(tinacoId: number, sensorId: number) {
    //console.log('Conectando a Pusher...');
    const channelName = `.Sensor_${sensorId}_Data_${tinacoId}`;

    const subscribeToChannel = () => {
      const channel = echo.channel('reviews');
      //console.log('Canal reviews suscrito');
      //console.log('Escuchando en el canal:', channelName);
      channel.listen(channelName, (data: any) => {
        console.log(`Nueva data para sensor ${sensorId}:`, data);

        this.ngZone.run(() => {
          // Inserta el nuevo registro al principio del arreglo
          this.data.unshift(data.sensor);
          // Opcionalmente, si quieres reordenar siempre, puedes ordenar de nuevo:
          this.data.sort(
            (a: SensorHistorial, b: SensorHistorial) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
        });
      });
    };

    if (echo.connector.pusher.connection.state === 'connected') {
      //console.log('Conectado a Pusher');
      subscribeToChannel();
    } else {
      echo.connector.pusher.connection.bind('connected', () => {
        //console.log('Conectado a Pusher (después de bind)');
        subscribeToChannel();
      });
    }
  }

  goBack(): void {
    window.history.back();
  }
  goToPage(page: number): void {
    this.getHistory(Number(this.tinacoId), Number(this.sensorId), page);
  }
}

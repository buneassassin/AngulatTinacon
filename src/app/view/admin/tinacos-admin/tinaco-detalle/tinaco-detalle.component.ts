import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../Components/header/header.component';
import { SensoresServicioService } from '../../../../Services/tinaco/tinaco_indiv/sensores-servicio.service';
import { LoadingSkeletonComponent } from '../../../../Components/loading-skeleton/loading-skeleton.component';
import { Tinacos } from '../../../../Interface/Tinacon/tinacos';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SensorData } from '../../../../Interface/sensor/sensor';
import { forkJoin } from 'rxjs';
import { echo } from '../../../../echo-config';

@Component({
  selector: 'app-tinaco-detalle',
  imports: [
    CommonModule,
    HeaderComponent,
    LoadingSkeletonComponent,
    RouterLink,
  ],
  templateUrl: './tinaco-detalle.component.html',
  styleUrls: ['./tinaco-detalle.component.css'],
})
export class TinacoDetalleComponent implements OnInit {
  sensors: SensorData[] = [
    {
      id: 1,
      name: 'Ultrasonico',
      description: 'Ultrasonico',
      value: null,
      channelName: '',
    },
    {
      id: 2,
      name: 'Temperatura',
      description: 'Temperatura',
      value: null,
      channelName: '',
    },
    { id: 3, name: 'PH', description: 'PH', value: null, channelName: '' },
    {
      id: 4,
      name: 'Turbidez',
      description: 'Turbidez',
      value: null,
      channelName: '',
    },
    { id: 5, name: 'TDS', description: 'TDS', value: null, channelName: '' },
  ];
  tinaco: Tinacos | null = null;
  isLoading: boolean = true;
  idTinaco: string | null = null;

  constructor(
    private sensoresService: SensoresServicioService,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.route.paramMap.subscribe((params) => {
      // Obtiene el valor dinámico de la URL
      this.idTinaco = params.get('id');
      //console.log('ID del tinaco:', this.idTinaco);
      // Una vez obtenido el id, asignamos dinámicamente los nombres de canal para cada sensor.
      if (this.idTinaco) {
        this.sensors = this.sensors.map((sensor) => ({
          ...sensor,
          channelName: `.Sensor_${sensor.id}_Data_${this.idTinaco}`,
        }));
      }
    });
  }

  ngOnInit(): void {
    this.getTinaco();
  }

  getTinaco(): void {
    // Obtenemos el id del tinaco de la URL
    const tinacoId = this.route.snapshot.paramMap.get('id');
    this.sensoresService.getTinaco(Number(tinacoId)).subscribe({
      next: (response: any) => {
        // Se asume que la API devuelve el tinaco en response.tinaco
        this.tinaco = response.tinaco;
        setTimeout(() => {
          // Una vez obtenido el tinaco, se solicita el valor de cada sensor
          if (this.tinaco && this.tinaco.id !== undefined) {
            this.getSensorValue(this.tinaco.id);
            this.setupEchoConnection();
          } else {
            this.isLoading = false;
          }
        }, 2000);
      },
      error: (error) => {
        //console.error('Error al obtener tinaco:', error);
        this.isLoading = false;
      },
    });
  }

  getSensorValue(tinaco_id: number): void {
    const data = { tinaco_id };
    forkJoin({
      temperatura: this.sensoresService.getTemperatura(data),
      ph: this.sensoresService.getPH(data),
      tds: this.sensoresService.getTDS(data),
      turbidez: this.sensoresService.getTurbidez(data),
      ultrasonico: this.sensoresService.getUltrasonico(data),
    }).subscribe({
      next: (responses: any) => {
        // Actualizamos el valor de cada sensor según la respuesta de la API
        this.sensors = this.sensors.map((sensor) => {
          //console.log(responses);
          let newValue;
          switch (sensor.id) {
            case 1:
              newValue = responses.ultrasonico.valor ?? 'Sin datos';
              break;
            case 2:
              newValue = responses.temperatura.valor ?? 'Sin datos';
              break;
            case 3:
              newValue = responses.ph.valor ?? 'Sin datos';
              break;
            case 4:
              newValue = responses.turbidez.valor ?? 'Sin datos';
              break;
            case 5:
              newValue = responses.tds.valor ?? 'Sin datos';
              break;
            default:
              newValue = 'Sin datos';
          }
          //console.log(newValue);
          return { ...sensor, value: newValue };
        
        });
        this.isLoading = false;
      },
      error: (error) => {
        //console.error('Error al obtener los valores de los sensores:', error);
        this.isLoading = false;
      },
    });
  }

  private setupEchoConnection() {
    //console.log('Conectando a Pusher...');

    const subscribeToChannel = () => {
      const channel = echo.channel('reviews');
      //console.log('Canal reviews suscrito');
      this.sensors.forEach((sensor) => {
        //console.log('Escuchando en el canal:', sensor.channelName);
        channel.listen(sensor.channelName, (data: any) => {
         // console.log(`Nueva data para sensor ${sensor.name}:`, data);
          this.ngZone.run(() => {
            this.getSensorValue(this.tinaco!.id);
            this.getTinaco();
          });
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
}

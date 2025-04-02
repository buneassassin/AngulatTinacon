import { CommonModule } from '@angular/common';
import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SensoresData } from '../../../Interface/Tinacon/tinaco_indiv/sensores-data';
import { SensoresServicioService } from '../../../Services/tinaco/tinaco_indiv/sensores-servicio.service';
import { Tinacos } from '../../../Interface/Tinacon/tinacos';
import { echo } from '../../../echo-config';
import { SensorData } from '../../../Interface/sensor/sensor';
import { forkJoin } from 'rxjs';
import { LoadingSkeletonComponent } from '../../../Components/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-tinaco-indiv',
  imports: [CommonModule, RouterLink, LoadingSkeletonComponent],
  templateUrl: './tinaco-indiv.component.html',
  styleUrl: './tinaco-indiv.component.css',
})
export class TinacoIndivComponent implements OnInit, OnDestroy {
  features: SensoresData[] = [];
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
  route: ActivatedRoute = inject(ActivatedRoute);
  tinaco: Tinacos | null = null;
  idTinaco: string | null = null;
  isLoading: boolean = true;


  constructor(private sensoresService: SensoresServicioService,private ngZone: NgZone) {
    //se escuchan los cambios y se extra el parámetro
    this.route.paramMap.subscribe((params) => {
      //obtiene el valor dinamico de la url
      this.idTinaco = params.get('id');
      //console.log('ID del tinaco:', this.idTinaco);
      if (this.idTinaco) {
        this.sensors = this.sensors.map(sensor => ({
          ...sensor,
          channelName: `.Sensor_${sensor.id}_Data_${this.idTinaco}`
        }));
      }
    });

    this.setupEchoConnection();
  }
  ngOnDestroy(): void {
    //console.log('Desuscribiendo el canal reviews...');
    echo.leaveChannel('reviews');
  }
  ngOnInit(): void {
    this.getTinaco();
  }
  getTinaco(): void {
    if (this.idTinaco) {
      this.sensoresService.getTinaco(Number(this.idTinaco)).subscribe({
        next: (response: any) => {
          //console.log(response);
          this.tinaco = response.tinaco;

          if (this.tinaco && this.tinaco.id !== undefined) {
            this.getSensorValue(this.tinaco.id);
            this.setupEchoConnection();
          }
          
        },
        error: (error) => {
          //console.error('Error al obtener tinaco:', error);
          this.isLoading = false;
        }
      });
    }
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
          this.sensors = this.sensors.map(sensor => {
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
            this.isLoading = false;
            return { ...sensor, value: newValue };
          });
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
        this.sensors.forEach(sensor => {
          //console.log('Escuchando en el canal:', sensor.channelName);
          channel.listen(sensor.channelName, (data: any) => {
            console.log(`Nueva data para sensor ${sensor.name}:`, data);
            this.ngZone.run(() => {
              this.getSensorValue(this.tinaco!.id);
            })
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
}

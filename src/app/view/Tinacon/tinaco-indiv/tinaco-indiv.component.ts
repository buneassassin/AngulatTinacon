import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SensoresData } from '../../../Interface/Tinacon/tinaco_indiv/sensores-data';
import { SensoresServicioService } from '../../../Services/tinaco/tinaco_indiv/sensores-servicio.service';
import { Tinacos } from '../../../Interface/Tinacon/tinacos';
import { echo } from '../../../echo-config';

@Component({
  selector: 'app-tinaco-indiv',
  imports: [CommonModule, RouterLink],
  templateUrl: './tinaco-indiv.component.html',
  styleUrl: './tinaco-indiv.component.css',
})
export class TinacoIndivComponent implements OnInit, OnDestroy {
  features: SensoresData[] = [];

  route: ActivatedRoute = inject(ActivatedRoute);
  tinaco: Tinacos | null = null;
  idTinaco: string | null = null;

  SensorUltrasonicoData: string | null = null;

  constructor(private sensoresService: SensoresServicioService) {
    //se escuchan los cambios y se extra el parámetro
    this.route.paramMap.subscribe((params) => {
      //obtiene el valor dinamico de la url
      this.idTinaco = params.get('id');
      console.log('ID del tinaco:', this.idTinaco);
    });
    this.SensorUltrasonicoData = '.Sensor_1_Data_' + this.idTinaco;

    this.setupEchoConnection();
  }
  ngOnDestroy(): void {
    console.log('Desuscribiendo el canal reviews...');
    echo.leaveChannel('reviews');
  }
  ngOnInit(): void {
    this.getTinaco();
  }
  getTinaco(): void {
    if (this.idTinaco) {
      this.sensoresService.getTinaco(Number(this.idTinaco)).subscribe({
        next: (response: any) => {
          console.log(response);
          this.tinaco = response.tinaco;
        },
        error: (error) => console.error('Error al obtener tinacos:', error),
      });
    }
  }

  private setupEchoConnection() {
    console.log('Conectando a Pusher...');

    // Función que suscribe al canal y al evento
    const subscribeToChannel = () => {
      console.log('Suscribiéndome al canal reviews...');
      const mas = echo.channel('reviews');
      console.log('Canal reviews suscrito');
      console.log(this.SensorUltrasonicoData);
      mas.listen(this.SensorUltrasonicoData!, (data: any) => {
        console.log('Nueva reseña recibida en tiempo real:', data);
        this.sensoresService.getTinaco(Number(this.idTinaco)).subscribe({
          next: (response: any) => {
            this.tinaco = response.tinaco;
            console.log('Mas:',response);
          },
          error: (error) => console.error('Error al obtener tinacos:', error),
        });
      });
    };

    if (echo.connector.pusher.connection.state === 'connected') {
      console.log('Conectado a Pusher1');
      subscribeToChannel();
    } else {
      echo.connector.pusher.connection.bind('connected', () => {
        console.log('Conectado a Pusher2');
        subscribeToChannel();
      });
    }
  }
}

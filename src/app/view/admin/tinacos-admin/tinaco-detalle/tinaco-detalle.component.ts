import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../Components/header/header.component';
import { SensoresServicioService } from '../../../../Services/tinaco/tinaco_indiv/sensores-servicio.service';
import { LoadingSkeletonComponent } from '../../../../Components/loading-skeleton/loading-skeleton.component';
import { Tinacos } from '../../../../Interface/Tinacon/tinacos';
import { ActivatedRoute, Router } from '@angular/router';
import { Sensor } from '../../../../Interface/sensor/sensor';
import { SensorData } from '../../../../Interface/sensor/sensor';
import { SensorResponsePH } from '../../../../Interface/sensor/sensor';
import { SensorResponseTemperatura } from '../../../../Interface/sensor/sensor';
import { SensorResponseTDS } from '../../../../Interface/sensor/sensor';
import { SensorResponseTurbidez } from '../../../../Interface/sensor/sensor';
import { SensorResponseUltrasonico } from '../../../../Interface/sensor/sensor';

@Component({
  selector: 'app-tinaco-detalle',
  imports: [CommonModule, HeaderComponent, LoadingSkeletonComponent],
  templateUrl: './tinaco-detalle.component.html',
  styleUrl: './tinaco-detalle.component.css',
})
export class TinacoDetalleComponent implements OnInit {
  sensors: SensorData[] = [];
  sensor: Sensor | null = null;
  tinaco: Tinacos | null = null;
  
  ph: SensorResponsePH | null = null;
  temperatura: SensorResponseTemperatura | null = null;
  turbidez: SensorResponseTurbidez | null = null;
  tds: SensorResponseTDS | null = null;
  ultrasonico: SensorResponseUltrasonico | null = null;

  isLoading: boolean = true;
  constructor(
    private sensoresService: SensoresServicioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Datos estáticos de ejemplo para sensores.
    // En el futuro se reemplazarán por llamados a la API.
   /*this.sensors = [
      {
        id: 1,
        name: 'Sensor Tinaco',
        description: 'Nivel de agua',
        value: '75%',
      },
      {
        id: 2,
        name: 'Sensor Temperatura',
        description: 'Temperatura ambiente',
        value: '25°C',
      },
      { id: 3, name: 'Sensor pH', description: 'Nivel de pH', value: '7.2' },
      {
        id: 4,
        name: 'Sensor Turbidez',
        description: 'Grado de turbidez',
        value: 'Moderado',
      },
      {
        id: 5,
        name: 'Sensor TDS',
        description: 'Sólidos totales disueltos',
        value: '500 ppm',
      },
      {
        id: 6,
        name: 'Sensor Ultrasónico',
        description: 'Distancia al fondo',
        value: '12 cm',
      },
    ];*/
    this.getTinaco();
    if (this.tinaco?.id !== undefined) {
      this.getSensorValue(this.tinaco.id);
    }
  }
  getTinaco() {
    //sacamos el id del tinaco de la url
    const tinacoId = this.route.snapshot.paramMap.get('id');
    this.sensoresService.getTinaco(Number(tinacoId)).subscribe({
      next: (response: any) => {
        // Se espera que la API devuelva un arreglo de tinacos
        this.tinaco = response.tinaco;
        this.isLoading = false;
        console.log('Tinacos:', response.sensores);
      },
      error: (error) => console.error('Error al obtener tinacos:', error),
    });
  }
  getSensorValue(id: number): void {
    this.sensoresService.getTemperatura(id).subscribe({
      next: (response: any) => {
        this.temperatura = response.value;
      },
      error: (error) =>
        console.error('Error al obtener el valor del sensor', error),
    });
    this.sensoresService.getPH(id).subscribe({
      next: (response: any) => {
        this.ph = response.value;
      },
      error: (error) =>
        console.error('Error al obtener el valor del sensor', error),
    });
    this.sensoresService.getTDS(id).subscribe({
      next: (response: any) => {
        this.tds = response.value;
      },
      error: (error) =>
        console.error('Error al obtener el valor del sensor', error),
    });
    this.sensoresService.getTurbidez(id).subscribe({
      next: (response: any) => {
        this.turbidez = response.value;
      },
      error: (error) =>
        console.error('Error al obtener el valor del sensor', error),
    });
    this.sensoresService.getUltrasonico(id).subscribe({
      next: (response: any) => {
        this.ultrasonico = response.value;
      },
      error: (error) =>
        console.error('Error al obtener el valor del sensor', error),
    });
  }
}

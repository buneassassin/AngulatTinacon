import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../Components/header/header.component';
import { SensoresServicioService } from '../../../../Services/tinaco/tinaco_indiv/sensores-servicio.service';
import { LoadingSkeletonComponent } from '../../../../Components/loading-skeleton/loading-skeleton.component';
import { Tinacos } from '../../../../Interface/Tinacon/tinacos';
import { ActivatedRoute, Router } from '@angular/router';

interface SensorData {
  id: number;
  name: string;
  description: string;
  value: string;
}
@Component({
  selector: 'app-tinaco-detalle',
  imports: [CommonModule, HeaderComponent, LoadingSkeletonComponent],
  templateUrl: './tinaco-detalle.component.html',
  styleUrl: './tinaco-detalle.component.css',
})
export class TinacoDetalleComponent implements OnInit {
  sensors: SensorData[] = [];
  tinaco: Tinacos | null = null;
  isLoading: boolean = true;
  constructor(private sensoresService: SensoresServicioService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Datos estáticos de ejemplo para sensores.
    // En el futuro se reemplazarán por llamados a la API.
    this.sensors = [
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
    ];
    this.getTinaco();
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
      error: (error) => console.error('Error al obtener tinacos:', error)
    });
  }
}

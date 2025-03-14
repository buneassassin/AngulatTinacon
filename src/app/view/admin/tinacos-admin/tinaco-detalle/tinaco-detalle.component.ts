import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../Components/header/header.component';
import { SensoresServicioService } from '../../../../Services/tinaco/tinaco_indiv/sensores-servicio.service';
import { LoadingSkeletonComponent } from '../../../../Components/loading-skeleton/loading-skeleton.component';
import { Tinacos } from '../../../../Interface/Tinacon/tinacos';
import { ActivatedRoute } from '@angular/router';
import { SensorData } from '../../../../Interface/sensor/sensor';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tinaco-detalle',
  imports: [CommonModule, HeaderComponent, LoadingSkeletonComponent],
  templateUrl: './tinaco-detalle.component.html',
  styleUrls: ['./tinaco-detalle.component.css']
})
export class TinacoDetalleComponent implements OnInit {
  sensors: SensorData[] = [];
  tinaco: Tinacos | null = null;
  isLoading: boolean = true;

  constructor(
    private sensoresService: SensoresServicioService,
    private route: ActivatedRoute
  ) {}

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

        // Una vez obtenido el tinaco, se solicita el valor de cada sensor
        if (this.tinaco && this.tinaco.id !== undefined) {
          this.getSensorValue(this.tinaco.id);
        } else {
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error al obtener tinaco:', error);
        this.isLoading = false;
      }
    });
  }

  getSensorValue(tinaco_id: number): void {
    const data = { tinaco_id };
    forkJoin({
      temperatura: this.sensoresService.getTemperatura(data),
      ph: this.sensoresService.getPH(data),
      tds: this.sensoresService.getTDS(data),
      turbidez: this.sensoresService.getTurbidez(data),
      ultrasonico: this.sensoresService.getUltrasonico(data)
    }).subscribe({
      next: (responses: any) => {
        // Se espera que cada respuesta tenga una propiedad "value"
        this.sensors = [
          { id: 2, name: 'Temperatura', description: 'Temperatura', value: responses.temperatura.valor ?? 'Sin datos' },
          { id: 3, name: 'PH', description: 'PH', value: responses.ph.valor ?? 'Sin datos' },
          { id: 5, name: 'TDS', description: 'TDS', value: responses.tds.valor ?? 'Sin datos' },
          { id: 4, name: 'Turbidez', description: 'Turbidez', value: responses.turbidez.valor ?? 'Sin datos' },
          { id: 1, name: 'Ultrasonico', description: 'Ultrasonico', value: responses.ultrasonico.valor ?? 'Sin datos' }
        ];
        
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener los valores de los sensores:', error);
        this.isLoading = false;
      }
    });
  }
}

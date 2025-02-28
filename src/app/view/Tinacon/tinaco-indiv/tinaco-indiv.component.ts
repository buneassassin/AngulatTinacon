import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SensoresData } from '../../../Interface/Tinacon/tinaco_indiv/sensores-data';
import { SensoresServicioService } from '../../../Services/tinaco/tinaco_indiv/sensores-servicio.service';
import { Tinacos } from '../../../Interface/Tinacon/tinacos';


@Component({
  selector: 'app-tinaco-indiv',
  imports: [CommonModule,RouterLink],
  templateUrl: './tinaco-indiv.component.html',
  styleUrl: './tinaco-indiv.component.css'
})
export class TinacoIndivComponent implements OnInit {
  features:SensoresData[] = [ ];
  
  route:ActivatedRoute = inject(ActivatedRoute);
  tinaco: Tinacos | null = null;
  idTinaco: string | null = null;

  constructor(private sensoresService:SensoresServicioService) {
    //se escuchan los cambios y se extra el parámetro
    this.route.paramMap.subscribe(params => {
      //obtiene el valor dinamico de la url
      this.idTinaco = params.get('id'); 
      console.log('ID del tinaco:', this.idTinaco);
    });
  }

  ngOnInit(): void {
    if (this.idTinaco) {
      this.sensoresService.getTinaco(Number(this.idTinaco)).subscribe({
        next: (response: any) => {
          // Se espera que la API devuelva un arreglo de tinacos
          this.tinaco = response.tinaco;
          console.log('Tinacos:', response.sensores);
        },
        error: (error) => console.error('Error al obtener tinacos:', error)
      });
    }
  }
}

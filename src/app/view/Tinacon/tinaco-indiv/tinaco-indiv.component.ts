import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensoresData } from '../../../Interface/Tinacon/tinaco_indiv/sensores-data';


@Component({
  selector: 'app-tinaco-indiv',
  imports: [CommonModule],
  templateUrl: './tinaco-indiv.component.html',
  styleUrl: './tinaco-indiv.component.css'
})
export class TinacoIndivComponent {
  features:SensoresData[] = [ ];
  
  route:ActivatedRoute = inject(ActivatedRoute);
  //housingService = inject(Tinaco); // para cuando tengamos algun servicio

  //guarda el id de la url
  idTinaco: string | null = null;

  constructor() {
    //se escuchan los cambios y se extra el parámetro
    this.route.paramMap.subscribe(params => {
      //obtiene el valor dinamico de la url
      this.idTinaco = params.get('id'); 
      console.log('ID del tinaco:', this.idTinaco);
    });
  }
}

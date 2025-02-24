// tinaco.component.ts
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RectangleRowsComponent } from '../../Components/rectangle-rows/rectangle-rows.component';
import { ModalComponent } from '../../Components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { Tinacos } from '../../Interface/Tinacon/tinacos';
import { TinacoBasicService } from '../../Services/Tinacon/tinaco-basic.service';

@Component({
  selector: 'app-tinaco',
  standalone: true,
  imports: [RouterModule, RectangleRowsComponent, ModalComponent,CommonModule],
  templateUrl: './tinaco.component.html',
  styleUrls: ['./tinaco.component.css']
})
export class TinacoComponent {
  features:Tinacos[] = [ ];
  obtenerServicio: TinacoBasicService = inject(TinacoBasicService);

  constructor() {
    this.features = this.obtenerServicio.getAllTinacos();
  }

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveModal() {
    console.log('Guardado con éxito');
    this.closeModal();
  }
}
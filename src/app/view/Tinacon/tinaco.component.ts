// tinaco.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RectangleRowsComponent } from '../../Components/rectangle-rows/rectangle-rows.component';
import { ModalComponent } from '../../Components/modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tinaco',
  standalone: true,
  imports: [RouterModule, RectangleRowsComponent, ModalComponent,CommonModule],
  templateUrl: './tinaco.component.html',
  styleUrls: ['./tinaco.component.css']
})
export class TinacoComponent {
  features = [
    { title: 'Tinaco1', nivel_del_agua: 100, id_tinaco: 1 },
    { title: 'Tinaco2', nivel_del_agua: 50, id_tinaco: 2 },
    { title: 'Tinaco4', nivel_del_agua: 20, id_tinaco: 4 },

  ];

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
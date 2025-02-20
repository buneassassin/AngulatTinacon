// tinaco.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RectangleRowsComponent } from '../../Components/rectangle-rows/rectangle-rows.component';
import { ModalComponent } from '../../Components/modal/modal.component';

@Component({
  selector: 'app-tinaco',
  standalone: true,
  imports: [RouterModule, RectangleRowsComponent, ModalComponent],
  templateUrl: './tinaco.component.html',
  styleUrls: ['./tinaco.component.css']
})
export class TinacoComponent {
  features = [
    { title: 'Tinaco1', nivel_del_agua: 100 },
    { title: 'Tinaco2', nivel_del_agua: 50 },
    { title: 'Tinaco3', nivel_del_agua: 30 },
    { title: 'Tinaco4', nivel_del_agua: 20 },
    { title: 'Tinaco5', nivel_del_agua: 10 },
    { title: 'Tinaco6', nivel_del_agua: 6 },
    { title: 'Tinaco7', nivel_del_agua: 5 },
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
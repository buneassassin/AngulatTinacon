import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string = ''; // Título dinámico
  @Output() save = new EventEmitter<void>(); // Evento para el botón guardar
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal

  /*
  para utilizar el modal se debe de poner los siguientes metodos para que el modal funcione correctamente en archivo ts del
  lugar donde se vaya a guardar(no pense en que el metodo save guardara realmente los datos 
  y por ahora saveModal() NO actua como un boton submit):

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
  
  */
}

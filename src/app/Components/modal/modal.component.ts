import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string = ''; // Título dinámico
  @Input() disableSave: boolean = false; // Controla si se deshabilita el botón de guardar
  
  @Output() save = new EventEmitter<void>(); // Evento para el botón guardar
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal

  // Para manejar el clic en el overlay
  onOverlayClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}

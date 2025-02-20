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
}

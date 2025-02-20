import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-link',
  imports: [RouterModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent {
  @Input() title: string = ''; // Título dinámico
  @Output() save = new EventEmitter<void>(); // Evento para el botón guardar
  @Output() close = new EventEmitter<void>();
}

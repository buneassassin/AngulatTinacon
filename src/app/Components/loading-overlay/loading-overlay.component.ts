import { Component } from '@angular/core';
import { LoadingService } from './loading.service'; // Servicio que crearemos
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule], // Aquí puedes importar otros módulos si es necesario
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.css'
})
export class LoadingOverlayComponent {
  constructor(public loadingService: LoadingService) {}
}

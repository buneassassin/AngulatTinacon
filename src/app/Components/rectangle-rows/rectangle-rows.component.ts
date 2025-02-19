import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-rectangle-rows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rectangle-rows.component.html',
  styleUrl: './rectangle-rows.component.css'
})
export class RectangleRowsComponent {
  @Input() features: { title: string; description?: string; nivel_del_agua?: number }[] = [];
  getColor(nivel: number): string {
    if (nivel >= 8) {
      return 'green'; // Alto nivel (verde)
    } else if (nivel >= 5) {
      return 'yellow'; // Medio nivel (amarillo)
    } else {
      return 'red'; // Bajo nivel (rojo)
    }
  }
  getWaterHeight(nivel: number): string {
    return (nivel * 10) + '%'; // Ajusta la altura de la barra de agua según el nivel
  }
}

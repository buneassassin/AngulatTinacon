import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-parallax',
  imports: [CommonModule],
  templateUrl: './parallax.component.html',
  styleUrl: './parallax.component.css'
})
export class ParallaxComponent {
  @Input() backgroundImage: string = ''; // Imagen de fondo personalizada
  @Input() height: string = '400px'; // Altura por defecto
}

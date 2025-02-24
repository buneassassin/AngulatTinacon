import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParallaxComponent } from '../../Components/parallax/parallax.component';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { CardComponent } from '../../Components/card/card.component';
import { CommonModule } from '@angular/common';
import { RectangleRowsComponent } from '../../Components/rectangle-rows/rectangle-rows.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule, RectangleRowsComponent, ParallaxComponent, CarouselComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    { name: 'Monitoreo en Tiempo Real', description: 'Supervisa el nivel de agua en tu tinaco con datos actualizados al instante.' },
    { name: 'Alertas Inteligentes', description: 'Recibe notificaciones cuando el nivel de agua esté bajo o se detecten fugas.' },
    { name: 'Acceso Remoto', description: 'Consulta el estado de tu tinaco desde cualquier lugar con nuestra app web y móvil.' },
    { name: 'Ahorro de Agua', description: 'Optimiza el consumo y evita desperdicios con reportes detallados de uso.' },
    { name: 'Instalación Sencilla', description: 'Sensores de fácil montaje y configuración sin necesidad de obras complicadas.' },
  ];
  
}

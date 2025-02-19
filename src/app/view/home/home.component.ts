import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../../Components/nav/nav.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RectangleRowsComponent } from '../../Components/rectangle-rows/rectangle-rows.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavComponent, FooterComponent, CommonModule, RectangleRowsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    { title: 'Innovación', description: 'Descubre soluciones modernas y escalables para tus proyectos.' },
    { title: 'Performance', description: 'Optimización y velocidad para una experiencia de usuario única.' },
    { title: 'Responsive', description: 'Diseño adaptativo para todos los dispositivos y tamaños de pantalla.' },
    { title: 'viva boca', description: 'si.' } // ahora podemos agregar mas cosas a lo pelotudo y lo podemos reutilizar
  ];
}

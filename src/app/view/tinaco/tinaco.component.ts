import { Component } from '@angular/core';
import { NavComponent } from '../../Components/nav/nav.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import {  RouterModule } from '@angular/router';
import { RectangleRowsComponent} from '../../Components/rectangle-rows/rectangle-rows.component';
@Component({
  selector: 'app-tinaco',
  standalone: true,
  imports: [ NavComponent, FooterComponent, RouterModule, RectangleRowsComponent],
  templateUrl: './tinaco.component.html',
  styleUrl: './tinaco.component.css'
})
export class TinacoComponent {
  features = [
    { title: 'Tinaco1', description: 'Descubre soluciones modernas y escalables para tus proyectos.' },
    { title: 'Tinaco2', description: 'Optimización y velocidad para una experiencia de usuario única.' },
    { title: 'Tinaco3', description: 'Diseño adaptativo para todos los dispositivos y tamaños de pantalla.' },
  ];
}

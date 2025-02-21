import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectangleRowsComponent} from '../../Components/rectangle-rows/rectangle-rows.component';
import { BreadcrumbComponent  } from '../../Components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-info',
  imports: [CommonModule, RectangleRowsComponent, BreadcrumbComponent],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  features = [
    { 
      title: 'Monitoreo en Tiempo Real', 
      description: 'Visualiza el nivel de agua en tu tinaco de forma continua y recibe datos precisos al instante.', 
      icon: 'fas fa-water'
    },
    { 
      title: 'Alertas Inteligentes', 
      description: 'Recibe notificaciones automáticas cuando el nivel de agua alcance límites críticos.', 
      icon: 'fas fa-bell'
    },
    { 
      title: 'Acceso Remoto', 
      description: 'Controla y consulta el estado de tu tinaco desde cualquier lugar mediante nuestra aplicación móvil.', 
      icon: 'fas fa-mobile-alt'
    }
  ];
}

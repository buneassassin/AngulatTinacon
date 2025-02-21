import { Component } from '@angular/core';
import { RouterOutlet, Route } from '@angular/router';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,FooterComponent,NavComponent,CommonModule,SidebarComponent], // Importa RouterOutlet aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IntegradoraAngularTinacon';
  isAuthPage = false; 

  isAdminPage = false;

  constructor(private router: Router) {
    // Detectar cambios en la ruta
    this.router.events.subscribe(() => {
      const authRoutes = ['/login', '/register', '/admin']; // Rutas donde NO quieres mostrar el navbar y footer
      this.isAuthPage = authRoutes.includes(this.router.url);
    });

    // Detectar cambios en la ruta
    this.router.events.subscribe(() => {
      const adminRoutes = ['/admin'];
      this.isAdminPage = adminRoutes.includes(this.router.url);
    });
  }
}

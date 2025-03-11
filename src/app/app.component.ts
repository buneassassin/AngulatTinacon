import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './Components/footer/footer.component';
import { NavComponent } from './Components/nav/nav.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { FondoComponent } from './Components/fondo/fondo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FooterComponent, NavComponent, CommonModule, SidebarComponent, FondoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IntegradoraAngularTinacon';
  isAuthPage = false; 
  isAdminPage = false;

  private authRoutes: string[] = [
    '/login', 
    '/register',
    '/recuperar', 
    '/admin', 
    '/admin/user',
    '/admin/graficas',
    '/admin/tinacos',
    '/admin/tinacos/:id',
    '/admin/notificaciones'
  ];

  private adminRoutes: string[] = [
    '/admin', 
    '/admin/user',
    '/admin/graficas',
    '/admin/tinacos',
    '/admin/tinacos/:id',
    '/admin/notificaciones'
  ];

  constructor(private router: Router) {
    // Suscribirse a eventos del router (filtrando solo NavigationEnd)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isAuthPage = this.authRoutes.some(route => this.matchRoute(route, url));
        this.isAdminPage = this.adminRoutes.some(route => this.matchRoute(route, url));
      }
    });
  }

  private matchRoute(route: string, url: string): boolean {
    // Si la ruta contiene parámetros dinámicos (por ejemplo, :id), comparamos solo la parte fija.
    if (route.includes(':')) {
      const baseRoute = route.split('/:')[0];
      return url.startsWith(baseRoute);
    }
    return url === route;
  }
}

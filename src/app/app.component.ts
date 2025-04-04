import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './Components/footer/footer.component';
import { NavComponent } from './Components/nav/nav.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { FondoComponent } from './Components/fondo/fondo.component';
import { LoadingSkeletonComponent } from './Components/loading-skeleton/loading-skeleton.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoadingOverlayComponent } from "./Components/loading-overlay/loading-overlay.component"; // Servicio que crearemos
import { LoadingService } from './Components/loading-overlay/loading.service';
import { NavigationStart,NavigationCancel ,NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FooterComponent, NavComponent, CommonModule, SidebarComponent, FondoComponent, LoadingSkeletonComponent, LoadingOverlayComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }]
})
export class AppComponent {
  title = 'IntegradoraAngularTinacon';
  isAuthPage = false; 
  isAdminPage = false;
  isLoading = true;

  private authRoutes: string[] = [
    '/login', 
    '/register',
    '/recuperar', 
    '/admin', 
    '/admin/user',
    '/admin/graficas',
    '/admin/tinacos',
    '/admin/tinacos/:id',
    '/admin/tinacos/:id/sensor/:id',
    '/admin/notificaciones'
  ];

  private adminRoutes: string[] = [
    '/admin', 
    '/admin/user',
    '/admin/graficas',
    '/admin/tinacos',
    '/admin/tinacos/:id',
    '/admin/tinacos/:id/sensor/:id',
    '/admin/notificaciones'
  ];

  constructor(private router: Router, private loadingService: LoadingService) {
    // Suscribirse a eventos del router (filtrando solo NavigationEnd)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isAuthPage = this.authRoutes.some(route => this.matchRoute(route, url));
        this.isAdminPage = this.adminRoutes.some(route => this.matchRoute(route, url));
        this.isLoading = false;
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
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }
      if (event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError) {
        this.loadingService.hide();
      }
    });
  }
}

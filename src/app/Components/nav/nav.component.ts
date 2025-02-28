import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth/auth.service';
import { User } from '../../Interface/user';
import { LoadingSkeletonComponent } from '../../Components/loading-skeleton/loading-skeleton.component';
import { NotificacionService } from '../../Services/notificacion/notificacion.service'; // Ajusta la ruta según tu proyecto

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, LoadingSkeletonComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: User | null = null; // Aquí se almacenará la información del usuario
  isLoadingUser: boolean = true;
  countNoti:any={};

  constructor(private authService: AuthService, private router: Router, private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.info();
    this.getNotiCount();
  }
  info(): void {
    this.authService.getUserData().subscribe({

      next: (response: any) => {
        if (response.success) {
          this.user = response.user;
          this.isLoadingUser = false;
         }
      },
      error: (error) => console.error('Error al obtener datos del usuario', error)
    });
  }
  logout(): void {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        console.log('Logout exitoso:', response);
        this.clearSession();
      },
      error: (error) => {
        console.error('Error al cerrar sesión', error);
        this.clearSession();
      },
    });
  }
  getNotiCount(): void {
    this.notificacionService.getNotificationsCount().subscribe({
      next: (response: any) => {
        // Asumiendo que la respuesta es un objeto { success: true, unread_count: 85 }
        this.countNoti = response.unread_count;
      },
      error: (error) => {
        console.error('Error al obtener el contador de notificaciones', error);
      }
    });
  }
  
  private clearSession(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

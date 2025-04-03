import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth/auth.service';
import { User } from '../../Interface/user';
import { LoadingSkeletonComponent } from '../../Components/loading-skeleton/loading-skeleton.component';
import { NotificacionService } from '../../Services/notificacion/notificacion.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    LoadingSkeletonComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  user: User | null = null;
  isLoadingUser: boolean = true;
  countNoti: any = {};

  private notiPollingSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.info();
    this.getNotiCount();

    this.notiPollingSubscription = interval(20000).subscribe(() => {
      //console.log('Actualizando notificaciones...');
      this.getNotiCount();
    });
  }

  info(): void {
    this.authService.getUserData().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.user = response.user;
          this.isLoadingUser = false;
        }
      },
      error: (error) => {
        // Maneja el error según lo necesites
      },
    });
  }

  logout(): void {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        this.clearSession();
      },
      error: (error) => {
        this.clearSession();
      },
    });
  }

  getNotiCount(): void {
    this.notificacionService.getNotificationsCount().subscribe({
      next: (response: any) => {
        // Asumiendo que la respuesta es { success: true, unread_count: 85 }
        this.countNoti = response.unread_count;
      },
      error: (error) => {
        // Maneja el error según lo necesites
      },
    });
  }

  private clearSession(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    // Cancela la suscripción del polling para evitar fugas de memoria
    if (this.notiPollingSubscription) {
      this.notiPollingSubscription.unsubscribe();
    }
  }
}

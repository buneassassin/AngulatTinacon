import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../Services/notificacion/notificacion.service'; // Ajusta la ruta según tu proyecto
import { CommonModule } from '@angular/common';
import { LoadingSkeletonComponent } from '../../Components/loading-skeleton/loading-skeleton.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule, LoadingSkeletonComponent,RouterLink],
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  notifications: any[] = [];
  isLoading: boolean = true;

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.getNotificaciones();
  }

  getNotificaciones(): void {
    this.notificacionService.getNotificaciones().subscribe({
      next: (response) => {
        if (response.success) {
          this.notifications = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener notificaciones:', error);
        this.isLoading = false;
      }
    });
  }
}

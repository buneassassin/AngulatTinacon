import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../Services/notificacion/notificacion.service';
import { CommonModule } from '@angular/common';
import { LoadingSkeletonComponent } from '../../Components/loading-skeleton/loading-skeleton.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule, LoadingSkeletonComponent, RouterLink],
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  notifications: any[] = [];
  isLoading: boolean = true;

  // Variables de paginación
  currentPage: number = 1;
  perPage: number = 10;
  totalPages: number = 0;

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.getNotificaciones(this.currentPage);
  }

  getNotificaciones(page: number = 1): void {
    this.notificacionService.getNotificaciones(page, this.perPage).subscribe({
      next: (response) => {
        if (response.success) {
          // La respuesta paginada se encuentra en response.data
          const paginationData = response.data;
          this.notifications = paginationData.data; // Los ítems de la página
          this.currentPage = paginationData.current_page;
          this.totalPages = paginationData.last_page;
          this.isLoading = false;
        }
      },
      error: (error) => {
        //console.error('Error al obtener notificaciones:', error);
        this.isLoading = false;
      }
    });
  }

  // Getter para generar un arreglo de números de páginas
  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  deleteNotification(notificationId: number): void {
    this.notificacionService.deleteNotification(notificationId).subscribe({
      next: (response) => {
        if (response.success) {
          this.getNotificaciones(this.currentPage);
        }
      },
      error: (error) => {
        //console.error('Error al eliminar notificación:', error);
      }
    });
  }
}

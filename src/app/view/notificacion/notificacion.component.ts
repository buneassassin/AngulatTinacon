import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../Services/notificacion/notificacion.service'; // Ajusta la ruta según tu proyecto
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  notifications: any[] = [];

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
      },
      error: (error) => {
        console.error('Error al obtener notificaciones:', error);
      }
    });
  }
}

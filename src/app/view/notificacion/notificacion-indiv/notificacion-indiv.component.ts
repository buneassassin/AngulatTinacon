import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotificacionService } from '../../../Services/notificacion/notificacion.service'; // Ajusta la ruta según tu proyecto


@Component({
  selector: 'app-notificacion-indiv',
  imports: [CommonModule,RouterLink],
  templateUrl: './notificacion-indiv.component.html',
  styleUrl: './notificacion-indiv.component.css',
})
export class NotificacionIndivComponent implements OnInit {
  router: ActivatedRoute = inject(ActivatedRoute);
  idNotificacion: string | null = null;
  ifoNotificacion:any;
  constructor(private notificacionService: NotificacionService) {
    this.router.paramMap.subscribe((params) => {
      this.idNotificacion = params.get('id');
      console.log('ID de la notificacion:', this.idNotificacion);
    });
  }
  ngOnInit(): void {
    this.getNotificacion();
  }

  getNotificacion() {
    if (this.idNotificacion) {
      console.log('ID de la notificacion:', this.idNotificacion);
      const notificacionId = parseInt(this.idNotificacion, 10);
      this.notificacionService.markAsRead(notificacionId).subscribe({
        next: (response) => {
          console.log('Notificacion marcada como leída:', response);
          this.ifoNotificacion = response;
        },
        error: (error) => {
          console.error('Error al marcar la notificacion como leída:', error);
        },
      });
    }
  }
}

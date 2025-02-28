import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notificacion-indiv',
  imports: [CommonModule],
  templateUrl: './notificacion-indiv.component.html',
  styleUrl: './notificacion-indiv.component.css'
})
export class NotificacionIndivComponent {
  router:ActivatedRoute = inject(ActivatedRoute);
  idNotificacion: string | null = null;
  constructor() {
    this.router.paramMap.subscribe(params => {
      this.idNotificacion = params.get('id');
      console.log('ID de la notificacion:', this.idNotificacion);
    });
  }
}

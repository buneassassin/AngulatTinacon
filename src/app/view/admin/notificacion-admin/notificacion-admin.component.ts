import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../Components/header/header.component';
import { AdminService } from '../../../Services/admin/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notificacion-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule], // Se usa FormsModule para ngModel
  templateUrl: './notificacion-admin.component.html',
  styleUrls: ['./notificacion-admin.component.css'],
})
export class NotificacionAdminComponent implements OnInit {
  title: string = '';
  mesaje: string = '';
  type: string = '';
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  enviarNotificacion() {
    if (!this.title || !this.mesaje || !this.type) {
      this.mensajeError = 'Todos los campos son obligatorios';
      this.mensajeExito = '';
      return;
    }

    const payload = {
      title: this.title,
      mesaje: this.mesaje,
      type: this.type
    };
    console.log(payload);

    this.adminService.enviarNotificacion(payload).subscribe({
      next: (response: any) => {
        console.log(response);
        this.mensajeExito = 'Notificación enviada con éxito';
        this.mensajeError = '';
        this.title = '';
        this.mesaje = '';
        this.type = '';
      },
      error: (error) => {
        console.error(error);
        this.mensajeError = 'Error al enviar la notificación';
      },
    });
  }
}

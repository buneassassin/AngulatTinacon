import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../Components/header/header.component';
import { CanComponentDeactivate } from '../../../Interface/Guards/can-component-deactivate';
import { AdminService } from '../../../Services/admin/admin.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-notificacion-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule], // Se usa FormsModule para ngModel
  templateUrl: './notificacion-admin.component.html',
  styleUrls: ['./notificacion-admin.component.css'],
})
export class NotificacionAdminComponent
  implements OnInit, CanComponentDeactivate
{
  notificacionForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.notificacionForm = this.fb.group({
      title: ['', [Validators.required]],
      mesaje: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  get f() {
    return this.notificacionForm.controls;
  }
  enviarNotificacion() {
    if (this.notificacionForm.invalid) return;

    const payload = {
      title: this.notificacionForm.value.title,
      mesaje: this.notificacionForm.value.mesaje,
      type: this.notificacionForm.value.type,
    };

    this.adminService.enviarNotificacion(payload).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.errorMessage = '';
        this.successMessage = 'Notificación enviada exitosamente';
        this.notificacionForm.reset();
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessage =
            error.error.message || 'Datos inválidos. Verifica tu información.';
          this.successMessage = '';
        } else if (error.status === 500) {
          this.errorMessage = 'Error del servidor. Inténtalo más tarde.';
          this.successMessage = '';
        } else {
          this.errorMessage =
            'Error al enviar la notificación. Intenta de nuevo más tarde.';
          this.successMessage = '';
        }
      },
    });
  }
  canDeactivate(): boolean {
    if (this.notificacionForm.dirty) {
      return confirm('Tienes cambios sin guardar. ¿Seguro que deseas salir?');
    }
    return true;
  }
}

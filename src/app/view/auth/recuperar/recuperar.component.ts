import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CanComponentDeactivate } from '../../../Interface/Guards/can-component-deactivate';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/auth/auth.service';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css',
})
export class RecuperarComponent implements CanComponentDeactivate {
  recuperarForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.recuperarForm.controls;
  }

  onSubmit(): void {
    if (this.recuperarForm.invalid) return;
    const email = this.recuperarForm.value.email;

    this.authService.resetPassword(email).subscribe({
      next: (response) => {
        ////console.log('Registro exitoso:', response);
        this.errorMessage = '';
        this.successMessage = 'Registro exitoso, redirigiendo a login...';
        this.recuperarForm.reset();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        //console.error('Error en el registro:', error);
        if (error.status === 400) {
          this.errorMessage =
            error.error.message || 'Datos inválidos. Verifica tu información.';
        } else if (error.status === 500) {
          this.errorMessage = 'Error del servidor. Inténtalo más tarde.';
        } else {
          this.errorMessage = 'No se pudo registrar. Inténtalo nuevamente.';
        }
      },
    });
  }

  canDeactivate(): boolean {
    if (this.recuperarForm.dirty) {
      return confirm('Tienes cambios sin guardar. ¿Seguro que deseas salir?');
    }
    return true;
  }
}

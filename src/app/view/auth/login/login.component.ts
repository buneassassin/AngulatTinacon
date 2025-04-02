import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CanComponentDeactivate } from '../../../Interface/Guards/can-component-deactivate';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../Services/auth/auth.service';
import { User } from '../../../Interface/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements CanComponentDeactivate {
  loginForm: FormGroup;
  apiErrorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.apiErrorMessage = '';
    this.successMessage = '';
    const userCredentials: Partial<User> = this.loginForm.value;

    this.authService.loginUser(userCredentials as User).subscribe({
      next: (response) => {
        //console.log('Respuesta del servidor recibida:', response);
        localStorage.setItem('token', response.token);
        this.apiErrorMessage = '';
        this.successMessage = 'Inicio de sesión exitoso';
        this.loginForm.reset();
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (error) => {
        //console.error('Error en el login:', error);
        // Si la API devuelve un mensaje de error, lo mostramos; de lo contrario, mensaje genérico
        this.apiErrorMessage =
          error.error?.message ||
          'Ocurrió un error. Por favor, inténtalo de nuevo.';
      },
    });
  }
  canDeactivate(): boolean {
    if (this.loginForm.dirty) {
      return confirm('Tienes cambios sin guardar. ¿Seguro que deseas salir?');
    }
    return true;
  }
}

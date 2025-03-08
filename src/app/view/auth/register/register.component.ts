import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CanComponentDeactivate } from '../../../Interface/Guards/can-component-deactivate';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/auth/auth.service';
import { User } from '../../../Interface/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements CanComponentDeactivate {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Se define el formulario con todos los campos y validadores
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastNamePaterno: ['', [Validators.required, Validators.minLength(2)]],
      lastNameMaterno: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  // Método auxiliar para facilitar el acceso a los controles
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;


    // Construir el objeto newUser a partir de los valores del formulario
    const newUser: User = {
      nombres: this.registerForm.value.name,
      apellidoPaterno: this.registerForm.value.lastNamePaterno,
      apellidoMaterno: this.registerForm.value.lastNameMaterno,
      telefono: this.registerForm.value.phone,
      usuario_nom: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      rol: ''
    };

    this.authService.registerUser(newUser).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.errorMessage = '';
        this.successMessage = 'Registro exitoso, redirigiendo a login...';
        this.registerForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        if (error.status === 400) {
          this.errorMessage = error.error.message || 'Datos inválidos. Verifica tu información.';
        } else if (error.status === 500) {
          this.errorMessage = 'Error del servidor. Inténtalo más tarde.';
        } else {
          this.errorMessage = 'No se pudo registrar. Inténtalo nuevamente.';
        }
      },
    });
  }
  canDeactivate(): boolean {
    if (this.registerForm.dirty) {
      return confirm('Tienes cambios sin guardar. ¿Seguro que deseas salir?');
    }
    return true;
  }
}

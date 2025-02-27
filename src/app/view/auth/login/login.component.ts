import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service'; // Ajusta la ruta según tu estructura
import { User } from '../../../Interface/user';
import { CanComponentDeactivate } from '../../../Interface/Guards/can-component-deactivate';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements CanComponentDeactivate {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  datosNoGuardados: boolean = false;

// Método del Guard Exit
canExit(): boolean {
  console.log('canExit() llamado en LoginComponent');
  if (this.datosNoGuardados) {
    console.log('Hay cambios sin guardar. Mostrando confirmación...');
    const confirmacion = confirm('¿Seguro que quieres salir sin enviar los datos?');
    console.log('Confirmación del usuario:', confirmacion);
    return confirmacion;
  }
  console.log('No hay cambios sin guardar. Permitiendo salir...');
  return true;
}

// Simular cambios no guardados
onInputChange() {
  console.log('onInputChange() llamado. Marcando datosNoGuardados como true...');
  this.datosNoGuardados = true;
}

constructor(private authService: AuthService, private router: Router) {}

onSubmit(): void {
  console.log('onSubmit() llamado. Enviando datos...');
  const userCredentials: Partial<User> = {
    email: this.email,
    password: this.password,
  };

  this.authService.loginUser(userCredentials as User).subscribe({
    next: (response) => {
      console.log('Respuesta del servidor recibida:', response);
      localStorage.setItem('token', response.token);
      this.datosNoGuardados = false;
      console.log('Navegando a /home...');
      this.router.navigate(['/home']);
    },
    error: () => {
      console.error('Error en el login. Mostrando mensaje de error...');
      this.errorMessage = 'Credenciales inválidas, intenta de nuevo.';
    },
  });
}
}
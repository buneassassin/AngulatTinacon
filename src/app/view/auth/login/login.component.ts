import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/auth/auth.service';
import { User } from '../../../Interface/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  datosNoGuardados: boolean = false;

// Método del Guard Exit
canExit(): boolean {
  console.log('canExit() llamado. Comprobando si hay cambios sin guardar...');
  if (this.datosNoGuardados) {
    console.log('Hay cambios sin guardar. Mostrando confirmación...');
    const confirmacion = confirm('¿Seguro que quieres salir sin enviar los datos?');
    console.log('Confirmación del usuario:', confirmacion);
    return confirmacion;
  }
  console.log('No hay cambios sin guardar. Permitiendo salir...');
  return true;
}

// Se llama cada vez que el usuario interactúa con el formulario
onInputChange() {
  const formularioVacio = !this.email && !this.password;
  
  if (formularioVacio) {
    console.log('Formulario vacío. Marcando datosNoGuardados como false.');
    this.datosNoGuardados = false;
  } else {
    console.log('Se detectaron cambios en el formulario. Marcando datosNoGuardados como true.');
    this.datosNoGuardados = true;
  }
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
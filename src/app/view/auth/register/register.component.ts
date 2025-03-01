import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/auth/auth.service';
import { User } from '../../../Interface/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  lastNamePaterno: string = '';
  lastNameMaterno: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  username: string = '';
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
    const formularioVacio = !this.email && !this.password && !this.name &&
    !this.lastNamePaterno && !this.lastNameMaterno &&
    !this.phone && !this.username;

    if (formularioVacio) {
      console.log('Formulario vacío. Marcando datosNoGuardados como false.');
      this.datosNoGuardados = false;
    } else {
      console.log('Se detectaron cambios en el formulario. Marcando datosNoGuardados como true.');
      this.datosNoGuardados = true;
    }
  }
 
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    // Combina nombre y apellido para formar el nombre de usuario
    const newUser: Partial<User> = {
      usuario_nom:this.name,
      email: this.email,
      password: this.password,
      nombres: this.username,
      apellidoPaterno: this.lastNamePaterno,
      apellidoMaterno: this.lastNameMaterno,
      telefono: this.phone,

      rol: 'Usuario'
    };

    this.authService.registerUser(newUser as User).subscribe({
      next: (response) => {
        // Registro exitoso: redirige a login
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'No se pudo registrar, por favor intenta nuevamente.';
      }
    });
  }
}

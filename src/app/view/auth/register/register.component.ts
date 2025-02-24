import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service'; // Ajusta la ruta según tu estructura
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

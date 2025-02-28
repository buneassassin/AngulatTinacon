import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service'; // Ajusta la ruta según tu estructura
import { User } from '../../../Interface/user';
import { Persona } from '../../../Interface/persona';
@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css'
})
export class RecuperarComponent {
  email: string = '';
  
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    //resetPassword
    this.authService.resetPassword(this.email).subscribe({
      next: (response) => {
        // Registro exitoso: redirige a login
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
        alert('No se pudo registrar, por favor intenta nuevamente.');
      }
    });
  }

}

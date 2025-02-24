import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Usa CommonModule en lugar de BrowserModule
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service'; // Ajusta la ruta según tu estructura
import { User } from '../../../Interface/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Remplaza BrowserModule por CommonModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    const userCredentials: Partial<User> = {
      email: this.email,
      password: this.password
    };

    this.authService.loginUser(userCredentials as User).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Credenciales inválidas, intenta de nuevo.';
      }
    });
  }
}

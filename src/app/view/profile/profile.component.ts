
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth/auth.service'; // Ajusta la ruta según tu estructura
import { User } from '../../Interface/user';
import { Persona } from '../../Interface/persona';
import { CardHoverComponent } from '../../Components/card-hover/card-hover.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CardHoverComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null; // Aquí se almacenará la información del usuario
  persona: Persona | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.user = response.user;
        }
      },
      error: (error) => console.error('Error al obtener datos del usuario', error)
    });
  }
}

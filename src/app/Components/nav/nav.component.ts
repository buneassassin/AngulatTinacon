import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth/auth.service';
import { User } from '../../Interface/user';
import { LoadingSkeletonComponent } from '../../Components/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, LoadingSkeletonComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: User | null = null; // Aquí se almacenará la información del usuario
  isLoadingUser: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.info();
  }
  info(): void {
    this.authService.getUserData().subscribe({

      next: (response: any) => {
        if (response.success) {
          this.user = response.user;
          this.isLoadingUser = false;
         }
      },
      error: (error) => console.error('Error al obtener datos del usuario', error)
    });
  }
  logout(): void {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        console.log('Logout exitoso:', response);
        this.clearSession();
      },
      error: (error) => {
        console.error('Error al cerrar sesión', error);
        this.clearSession();
      },
    });
  }

  private clearSession(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

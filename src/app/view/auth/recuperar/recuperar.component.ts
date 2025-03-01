import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/auth/auth.service';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css'
})
export class RecuperarComponent {
  email: string = '';
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
    const formularioVacio = !this.email;
    
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

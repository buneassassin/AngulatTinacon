import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth/auth.service';
import { PerfilService } from '../../Services/perfil/perfil.service';
import { CardHoverComponent } from '../../Components/card-hover/card-hover.component';
import { ModalComponent } from '../../Components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { User } from '../../Interface/user';
import { Persona } from '../../Interface/persona';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CardHoverComponent, ModalComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  persona: Persona | null = null;
  isModalOpenPerfil = false;
  isModalOpenContrasena = false;
  isModalOpenModalFoto = false;

  // Propiedades para el formulario de cambio de contraseña
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.user = response.user;
        }
      },
      error: (error) =>
        console.error('Error al obtener datos del usuario', error),
    });
  }

  openModalPerfil(): void {
    this.isModalOpenPerfil = true;
  }
  openModalContrasena(): void {
    this.isModalOpenContrasena = true;
  }
  openModalFoto(): void {
    this.isModalOpenModalFoto = true;
  }
  closeModal(): void {
    if (this.isModalOpenContrasena) {
      this.isModalOpenContrasena = false;
    }
    if (this.isModalOpenModalFoto) {
      this.isModalOpenModalFoto = false;
    }
    if (this.isModalOpenPerfil) {
      this.isModalOpenPerfil = false;
    }
  }

  // Método para guardar los cambios de contraseña
  savePasswordChange(): void {
    if (this.newPassword !== this.confirmPassword) {
      console.error('La nueva contraseña y la confirmación no coinciden.');
      return;
    }
    const payload = {
      password: this.currentPassword,
      password_new: this.newPassword,
      password_confirmation: this.confirmPassword,
    };
    this.perfilService.updatePassword(payload).subscribe({
      next: (response: any) => {
        console.log('Contraseña actualizada con éxito:', response);
        this.closeModal();
      },
      error: (error: any) => {
        console.error('Error al actualizar la contraseña:', error);
      },
    });
  }
  // Método para guardar los cambios de perfil
  saveProfileChanges(): void {
    const payload = {
      nombres: this.user?.persona.nombres,
      usuario_nom: this.user?.persona.nombres,
      apellidoPaterno: this.user?.persona.a_p,
      apellidoMaterno: this.user?.persona.a_m,
      telefono: this.user?.persona.telefono,
    };
    this.perfilService.updateUser(payload).subscribe({
      next: (response: any) => {
        console.log('Perfil actualizado con éxito:', response);
        this.closeModal();
      },
      error: (error: any) => {
        console.error('Error al actualizar el perfil:', error);
      },
    });
  }

// Metodo para gusrdar la foto de perfil
saveProfilePicture(): void {
  const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
  const files = fileInput.files;
  if (files && files.length > 0) {
    const file = files[0];
    this.perfilService.uploadImage(file).subscribe({
      next: (response: any) => {
        console.log('Foto de perfil actualizada con éxito:', response);
        this.closeModal();
      },
      error: (error: any) => {
        console.error('Error al actualizar la foto de perfil:', error);
      },
    });
  } else {
    console.error('No file selected');
  }
}

  // Este método se invoca cuando se hace clic en el botón "Guardar" del modal.
  saveModal(): void {
    if (this.isModalOpenContrasena) {
      this.savePasswordChange();
    } else if (this.isModalOpenPerfil) {
      this.saveProfileChanges();
    } else if (this.isModalOpenModalFoto) {
      this.saveProfilePicture();
    } else {
      // Lógica para guardar cambios de perfil si aplica
      console.log('Guardado cambios de perfil');
      this.closeModal();
    }
  }
}

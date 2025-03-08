import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth/auth.service';
import { PerfilService } from '../../Services/perfil/perfil.service';
import { CardHoverComponent } from '../../Components/card-hover/card-hover.component';
import { ModalComponent } from '../../Components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { User } from '../../Interface/user';
import { Persona } from '../../Interface/persona';
import { LoadingSkeletonComponent } from '../../Components/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CardHoverComponent, ModalComponent, FormsModule, LoadingSkeletonComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  persona: Persona | null = null;
  isModalOpenPerfil = false;
  isModalOpenContrasena = false;
  isModalOpenModalFoto = false;
  datosNoGuardados: boolean = false;
  isLoading: boolean = true;
  successMessage: string | null = null;

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
          console.log('Datos del usuario obtenidos con éxito:', response);
          this.user = response.user;
          this.isLoading = false;
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
    if (this.datosNoGuardados) {
      const confirmacion = confirm('Tienes cambios sin guardar. ¿Seguro que quieres cerrar?');
      if (!confirmacion) return;
    }
    
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
      nombres: this.user?.persona?.nombres,
      usuario_nom: this.user?.usuario_nom,
      apellidoPaterno: this.user?.persona?.a_p,
      apellidoMaterno: this.user?.persona?.a_m,
      telefono: this.user?.persona?.telefono,
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
    const fileInput = document.getElementById(
      'profilePicture'
    ) as HTMLInputElement;
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
    console.log('Ejecutando onInputChange()');
    console.log('Estado actual de user:', this.user);
    console.log('Estado actual de datosNoGuardados:', this.datosNoGuardados);
    if (!this.user) return;

    const formularioVacio =
      !this.user.usuario_nom &&
      !this.user.persona?.nombres &&
      !this.user.persona?.a_p &&
      !this.user.persona?.a_m &&
      !this.user.persona?.telefono;

    if (formularioVacio) {
      console.log('Formulario vacío. Marcando datosNoGuardados como false.');
      this.datosNoGuardados = false;
    } else {
      console.log('Se detectaron cambios en el formulario. Marcando datosNoGuardados como true.');
      this.datosNoGuardados = true;
    }
  }
  
  verifyEmail(): void {
    if (this.user && this.user.email) {
      this.perfilService.sendEmail(this.user.email).subscribe({
        next: (response: any) => {
          console.log('Email verificado con éxito:', response);
          this.successMessage = 'Correo enviado con éxito';
  
          // Ocultar el mensaje después de 3 segundos
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error: (error: any) => {
          console.error('Error al verificar el email:', error);
        },
      });
    } else {
      console.error('User or email is not defined');
    }
  }
  

}
/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth/auth.service';
import { PerfilService } from '../../Services/perfil/perfil.service';
import { CardHoverComponent } from '../../Components/card-hover/card-hover.component';
import { ModalComponent } from '../../Components/modal/modal.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingSkeletonComponent } from '../../Components/loading-skeleton/loading-skeleton.component';
import { User } from '../../Interface/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CardHoverComponent, ModalComponent, FormsModule, ReactiveFormsModule, LoadingSkeletonComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isModalOpenPerfil = false;
  isModalOpenContrasena = false;
  isModalOpenModalFoto = false;
  datosNoGuardados: boolean = false;
  isLoading: boolean = true;
  successMessage: string | null = null;

  // Propiedades para el cambio de contraseña
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // Formulario reactivo para editar perfil
  profileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', Validators.required],
      lastNameP: ['', Validators.required],
      lastNameM: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (response: any) => {
        if (response.success) {
          console.log('Datos del usuario obtenidos con éxito:', response);
          this.user = response.user;
          this.isLoading = false;
        }
      },
      error: (error) => console.error('Error al obtener datos del usuario', error),
    });
  }

  // Abre el modal de edición e inicializa el formulario reactivo con los datos actuales
  openModalPerfil(): void {
    if (!this.user || !this.user.persona) return;

    this.profileForm = this.fb.group({
      username: [this.user.usuario_nom, [Validators.required, Validators.minLength(3)]],
      firstName: [this.user.persona.nombres, Validators.required],
      lastNameP: [this.user.persona.a_p, Validators.required],
      lastNameM: [this.user.persona.a_m, Validators.required],
      phone: [this.user.persona.telefono, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
    this.isModalOpenPerfil = true;
  }

  // Guarda los cambios del perfil usando los valores del formulario reactivo
  saveProfileChanges(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const payload = {
      nombres: this.profileForm.value.firstName,
      usuario_nom: this.profileForm.value.username,
      apellidoPaterno: this.profileForm.value.lastNameP,
      apellidoMaterno: this.profileForm.value.lastNameM,
      telefono: this.profileForm.value.phone,
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

  openModalContrasena(): void {
    this.isModalOpenContrasena = true;
  }
  openModalFoto(): void {
    this.isModalOpenModalFoto = true;
  }
  closeModal(): void {
    if (this.datosNoGuardados) {
      const confirmacion = confirm('Tienes cambios sin guardar. ¿Seguro que quieres cerrar?');
      if (!confirmacion) return;
    }
    this.isModalOpenContrasena = false;
    this.isModalOpenModalFoto = false;
    this.isModalOpenPerfil = false;
  }

  // Métodos para guardar contraseña y foto se mantienen sin cambios...
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

  // Método para el botón "Guardar" del modal
  saveModal(): void {
    if (this.isModalOpenContrasena) {
      this.savePasswordChange();
    } else if (this.isModalOpenPerfil) {
      this.saveProfileChanges();
    } else if (this.isModalOpenModalFoto) {
      this.saveProfilePicture();
    } else {
      this.closeModal();
    }
  }

  // Método del Guard Exit
  canExit(): boolean {
    console.log('canExit() llamado. Comprobando si hay cambios sin guardar...');
    if (this.datosNoGuardados) {
      const confirmacion = confirm('¿Seguro que quieres salir sin enviar los datos?');
      return confirmacion;
    }
    return true;
  }

  // Método que se invoca al interactuar con el formulario (puedes ajustarlo según tus necesidades)
  onInputChange() {
    console.log('Ejecutando onInputChange()');
    if (!this.user) return;
    // Lógica para marcar datos sin guardar, etc.
    this.datosNoGuardados = true;
  }

  verifyEmail(): void {
    if (this.user && this.user.email) {
      this.perfilService.sendEmail(this.user.email).subscribe({
        next: (response: any) => {
          console.log('Email verificado con éxito:', response);
          this.successMessage = 'Correo enviado con éxito';
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error: (error: any) => {
          console.error('Error al verificar el email:', error);
        },
      });
    } else {
      console.error('User or email is not defined');
    }
  }
}
*/
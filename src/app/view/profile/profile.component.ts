import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth/auth.service';
import { PerfilService } from '../../Services/perfil/perfil.service';
import { CardHoverComponent } from '../../Components/card-hover/card-hover.component';
import { ModalComponent } from '../../Components/modal/modal.component';
import { LoadingSkeletonComponent } from '../../Components/loading-skeleton/loading-skeleton.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../Interface/user';
import { Persona } from '../../Interface/persona';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    CardHoverComponent,
    ModalComponent,
    ReactiveFormsModule,
    LoadingSkeletonComponent
  ],
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
  
  // Mensajes de feedback
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Formularios reactivos
  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService,
    private fb: FormBuilder
  ) {
    // Formulario para editar perfil
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastNameP: ['', Validators.required],
      lastNameM: ['', Validators.required],
      phone: ['', Validators.required],
    });
    
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
    
  }
  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.user = response.user;
          this.initForms(); // Inicializa el formulario con los datos actuales.
          this.isLoading = false;
        }
      },
      error: (error) =>{
        //console.error('Error al obtener datos del usuario', error),
      }
    });
  }
  
  initForms(): void {
    this.profileForm = this.fb.group({
      usuario_nom: [this.user?.usuario_nom || '', Validators.required],
      nombres: [this.user?.persona?.nombres || '', Validators.required],
      apellidoPaterno: [this.user?.persona?.a_p || '', Validators.required],
      apellidoMaterno: [this.user?.persona?.a_m || '', Validators.required],
      telefono: [this.user?.persona?.telefono || '', Validators.required],
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    
    if (newPassword && confirmPassword) {
      if (newPassword.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
    return null;
  }
  

  openModalPerfil(): void {
    if (this.user) {
      this.profileForm.patchValue({
        usuario_nom: this.user.usuario_nom,
        nombres: this.user.persona?.nombres,
        apellidoPaterno: this.user.persona?.a_p,
        apellidoMaterno: this.user.persona?.a_m,
        telefono: this.user.persona?.telefono,
      });
    }
    this.isModalOpenPerfil = true;
  }
  
  openModalContrasena(): void {
    this.isModalOpenContrasena = true;
  }

  openModalFoto(): void {
    this.isModalOpenModalFoto = true;
  }

  closeModal(): void {
    // Cierra todos los modales
    this.isModalOpenContrasena = false;
    this.isModalOpenModalFoto = false;
    this.isModalOpenPerfil = false;
    // Limpia mensajes de feedback
    this.successMessage = null;
    this.errorMessage = null;
    // Limpia formularios
    this.profileForm.reset();
    this.passwordForm.reset();

  }

  // Guardar cambios en el perfil (usuario, nombres, apellidos y teléfono)
  saveProfileChanges(): void {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Por favor, corrige los errores en el formulario.';
      setTimeout(() => this.errorMessage = null, 3000);
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
        //console.log('Perfil actualizado con éxito:', response);
        this.successMessage = 'Perfil actualizado con éxito';
        setTimeout(() => {
          this.successMessage = null;
          this.closeModal();
        }, 3000);
      },
      error: (error: any) => {
        //console.error('Error al actualizar el perfil:', error);
        this.errorMessage = 'Error al actualizar el perfil';
        setTimeout(() => this.errorMessage = null, 3000);
      },
    });
  }

  // Guardar cambios de contraseña
  savePasswordChange(): void {
    if (this.passwordForm.invalid) {
      this.errorMessage = 'Por favor, corrige los errores en el formulario.';
      setTimeout(() => this.errorMessage = null, 3000);
      return;
    }
    const payload = {
      password: this.passwordForm.value.currentPassword,
      password_new: this.passwordForm.value.newPassword,
      password_confirmation: this.passwordForm.value.confirmPassword,
    };
    this.perfilService.updatePassword(payload).subscribe({
      next: (response: any) => {
        //console.log('Contraseña actualizada con éxito:', response);
        this.successMessage = 'Contraseña actualizada con éxito';
        setTimeout(() => {
          this.successMessage = null;
          this.closeModal();
        }, 3000);
      },
      error: (error: any) => {
        //console.error('Error al actualizar la contraseña:', error);
        this.errorMessage = error.error.message || 'Error al actualizar la contraseña';
        setTimeout(() => this.errorMessage = null, 3000);
      },
    });
  }

  // Guardar foto de perfil
  saveProfilePicture(): void {
    const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.perfilService.uploadImage(file).subscribe({
        next: (response: any) => {
          //console.log('Foto de perfil actualizada con éxito:', response);
          this.successMessage = 'Foto de perfil actualizada con éxito';
          setTimeout(() => {
            this.successMessage = null;
            this.closeModal();
          }, 3000);
        },
        error: (error: any) => {
          //console.error('Error al actualizar la foto de perfil:', error);
          this.errorMessage = 'Error al actualizar la foto de perfil';
          setTimeout(() => this.errorMessage = null, 3000);
        },
      });
    } else {
      this.errorMessage = 'No se seleccionó ningún archivo';
      setTimeout(() => this.errorMessage = null, 3000);
    }
  }

  // Método que se invoca al dar clic en "Guardar" del modal
  saveModal(): void {
    if (this.isModalOpenContrasena) {
      this.savePasswordChange();
    } else if (this.isModalOpenPerfil) {
      this.saveProfileChanges();
    } else if (this.isModalOpenModalFoto) {
      this.saveProfilePicture();
    }
  }

  verifyEmail(): void {
    if (this.user && this.user.email) {
      this.perfilService.sendEmail(this.user.email).subscribe({
        next: (response: any) => {
          //console.log('Correo enviado con éxito:', response);
          this.successMessage = 'Correo enviado con éxito';
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (error: any) => {
          //console.error('Error al verificar el email:', error);
          this.errorMessage = 'Error al enviar el correo';
          setTimeout(() => this.errorMessage = null, 3000);
        },
      });
    } else {
      //console.error('User o email no definidos');
    }
  }
}

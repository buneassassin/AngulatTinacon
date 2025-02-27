import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../Interface/user';
import { CardHoverComponent } from '../../../Components/card-hover/card-hover.component';
import { HeaderComponent } from '../../../Components/header/header.component';
import { AdminService } from '../../../Services/admin/admin.service';
import { ModalComponent } from '../../../Components/modal/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CardHoverComponent,
    ModalComponent,
    FormsModule,
  ],
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css'],
})
export class UserAdminComponent implements OnInit {
  informacionesUser: any = {};
  users: User[] = [];
  isModalOpenEditRol = false;
  usuariEditar: User | null = null;
  rolesSelected: string | null = null;
  roles: any[] = [];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUserStatistics().subscribe({
      next: (response: any) => {
        this.informacionesUser = response; // Asigna directamente el objeto
        console.log(response);
      },
      error: (error) =>
        console.error('Error al obtener datos del usuario', error),
    });

    this.adminService.obtenerUsuariosConTinacos().subscribe({
      next: (response: any) => {
        this.users = response; // Asigna directamente el objeto
        console.log(response);
      },
      error: (error) =>
        console.error('Error al obtener datos del usuario', error),
    });
    this.adminService.obtenerRol().subscribe({
      next: (response: any) => {
        console.log(response); // Verifica la estructura
        this.roles = response.roles; // Extraemos el array de roles
      },
      error: (error) =>
        console.error('Error al obtener datos del usuario', error),
    });
  }

  get adminCount(): number {
    return this.users.filter((u) => u.rol === 'Administrador').length;
  }

  get userCount(): number {
    return this.users.filter((u) => u.rol === 'Usuario').length;
  }

  openModalEditRol(user: User) {
    this.isModalOpenEditRol = true;
    this.usuariEditar = user;
    this.rolesSelected = user.rol;
  }

  closeModal() {
    if (this.isModalOpenEditRol) {
      this.isModalOpenEditRol = false;
      this.usuariEditar = null;
      this.rolesSelected = null;
    }
  }
  saveModal() {
    if (this.isModalOpenEditRol) {
      this.saveRolChange();
    }
  }

  saveRolChange(): void {
    if (this.usuariEditar && this.rolesSelected) {
      const payload = {
        email: this.usuariEditar.email,
        rol: this.rolesSelected,
      };

      this.adminService.cambiarRol(payload).subscribe({
        next: (response: any) => {
          console.log(response);
          this.closeModal();
        },
        error: (error) => console.error('Error al editar el rol', error),
      });
    }
  }
  validarCambioRol() {
    console.log('Rol seleccionado:', this.rolesSelected);

    if (this.rolesSelected === 'Admin') {
      const confirmacion = confirm(
        'Si asignas este usuario como admin, no podrás revertirlo. ¿Deseas continuar?'
      );
      if (!confirmacion) {
        this.rolesSelected = this.usuariEditar?.rol || null; // Restaurar valor anterior
      }
    }
  }

  toggleUserState(user: User) {
    //mostramos mesaje de confirmacion
    const confirmacion = confirm('¿Deseas deshabilitar a este usuario?');
    if (confirmacion) {
      const payload = {
        email: user.email,
      };
      this.adminService.desactivarUsuario(payload).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error) => console.error('Error al editar el rol', error),
      });
    }
  }
  toggleUserStateActive(user: User) {
    //mostramos mesaje de confirmacion
    const confirmacion = confirm('¿Deseas habilitar a este usuario?');
    if (confirmacion) {
      const payload = {
        email: user.email,
      };
      this.adminService.activarUsuario(payload).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error) => console.error('Error al editar el rol', error),
      });
    }
  }
}

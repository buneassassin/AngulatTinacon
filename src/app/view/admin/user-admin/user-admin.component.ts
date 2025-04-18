import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../Interface/user';
import { CardHoverComponent } from '../../../Components/card-hover/card-hover.component';
import { HeaderComponent } from '../../../Components/header/header.component';
import { AdminService } from '../../../Services/admin/admin.service';
import { ModalComponent } from '../../../Components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { LoadingSkeletonComponent } from '../../../Components/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CardHoverComponent,
    ModalComponent,
    FormsModule,
    LoadingSkeletonComponent,
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
  isLoading: boolean = true;

  // Variables de paginación
  currentPage: number = 1;
  perPage: number = 15;
  totalPages: number = 0;

   // Mensajes de feedback
   successMessage: string | null = null;
   errorMessage: string | null = null;

   successMessage2: string | null = null;
   errorMessage2: string | null = null;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUserStatistics().subscribe({
      next: (response: any) => {
        this.informacionesUser = response;
        this.isLoading = false;
        //console.log(response);
      },
      error: (error) => {
        //console.error('Error al obtener datos del usuario', error),
      },
    });

    // Cargar la primera página de usuarios
    this.loadUsers(this.currentPage);

    this.adminService.obtenerRol().subscribe({
      next: (response: any) => {
        //console.log(response);
        this.roles = response.roles;
      },
      error: (error) => {
        //console.error('Error al obtener datos del usuario', error),
      },
    });
  }

  // Método para cargar los usuarios de una página específica
  loadUsers(page: number): void {
    this.adminService.obtenerUsuariosConTinacos(page, this.perPage).subscribe({
      next: (response: any) => {
        this.users = response.data; // Asumimos que los usuarios están en "data"
        this.currentPage = response.current_page;
        this.totalPages = response.last_page;
        //console.log(response);
      },
      error: (error) => {
        //console.error('Error al obtener datos del usuario', error),
      },
    });
  }

  // Getter para generar un arreglo de números de páginas para iterar en la vista
  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Resto de métodos de tu componente...
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
      this.errorMessage = null;
      this.successMessage = null;
      this.ngOnInit();
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
          //console.log(response);
          this.successMessage = response.message || 'Rol cambiado correctamente';
          setTimeout(() => {
            this.successMessage = null;
            this.closeModal();
          }, 3000);
        },
        error: (error) => {
          //console.error('Error al editar el rol', error),
          this.errorMessage = error.error.message || 'Error al cambiar el rol';
          setTimeout(() => this.errorMessage = null, 3000);
        },
      });
    }
  }

  validarCambioRol() {
    //console.log('Rol seleccionado:', this.rolesSelected);

    if (this.rolesSelected === 'Admin') {
      const confirmacion = confirm(
        'Si asignas este usuario como admin, no podrás revertirlo. ¿Deseas continuar?'
      );
      if (!confirmacion) {
        this.rolesSelected = this.usuariEditar?.rol || null;
      }
    }
  }

  toggleUserState(user: User) {
    const confirmacion = confirm('¿Deseas deshabilitar a este usuario?');
    if (confirmacion) {
      const payload = {
        email: user.email,
      };
      this.adminService.desactivarUsuario(payload).subscribe({
        next: (response: any) => {
          //console.log(response);
          this.loadUsers(this.currentPage);
        },
        error: (error) => {
          //console.error('Error al editar el rol', error),
        },
      });
    }
  }

  toggleUserStateActive(user: User) {
    const confirmacion = confirm('¿Deseas habilitar a este usuario?');
    if (confirmacion) {
      const payload = {
        email: user.email,
      };
      this.adminService.activarUsuario(payload).subscribe({
        next: (response: any) => {
          //console.log(response);
          this.loadUsers(this.currentPage);
        },
        error: (error) => console.error('Error al editar el rol', error),
      });
    }
  }
}

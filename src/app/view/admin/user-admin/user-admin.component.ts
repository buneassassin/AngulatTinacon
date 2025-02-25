import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../Interface/user';
import { CardHoverComponent } from '../../../Components/card-hover/card-hover.component';
import { HeaderComponent } from '../../../Components/header/header.component';
import { AdminService } from '../../../Services/admin/admin.service';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardHoverComponent],
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css'],
})
export class UserAdminComponent {
  informacionesUser: any = {};
  users: User[] = [];

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
   
  }

  get adminCount(): number {
    return this.users.filter((u) => u.rol === 'Administrador').length;
  }

  get userCount(): number {
    return this.users.filter((u) => u.rol === 'Usuario').length;
  }
}

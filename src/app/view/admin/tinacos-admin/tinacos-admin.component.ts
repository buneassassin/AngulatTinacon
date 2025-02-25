import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../Components/header/header.component';
import { AdminService } from '../../../Services/admin/admin.service';

@Component({
  selector: 'app-tinacos-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './tinacos-admin.component.html',
  styleUrls: ['./tinacos-admin.component.css']
})
export class TinacosAdminComponent implements OnInit {
  // Almacenará el arreglo de usuarios con sus tinacos
  usersWithTinacos: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.obtenerUsuariosConTinacos().subscribe({
      next: (response: any) => {
        this.usersWithTinacos = response;
        console.log(response);
      },
      error: (error) =>
        console.error('Error al obtener datos de usuarios con tinacos', error)
    });
  }

  // Ejemplo de toggle para un tinaco (puedes adaptar la lógica)
  toggleTinaco(tinaco: any): void {
    tinaco.nivel_del_agua = tinaco.nivel_del_agua > 0 ? 0 : 100;
  }

  // Getter para total de tinacos
  get totalTinacos(): number {
    return this.usersWithTinacos.reduce((total, user) => {
      return total + (user.tinacos ? user.tinacos.length : 0);
    }, 0);
  }

  // Getter para tinacos activos (consideramos activos aquellos con nivel_del_agua > 0)
  get activeTinacos(): number {
    return this.usersWithTinacos.reduce((total, user) => {
      return total + (user.tinacos ? user.tinacos.filter((t: any) => t.nivel_del_agua > 0).length : 0);
    }, 0);
  }
}

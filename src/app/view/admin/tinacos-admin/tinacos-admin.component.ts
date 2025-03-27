import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../Components/header/header.component';
import { AdminService } from '../../../Services/admin/admin.service';
import { LoadingSkeletonComponent } from '../../../Components/loading-skeleton/loading-skeleton.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tinacos-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LoadingSkeletonComponent,],
  templateUrl: './tinacos-admin.component.html',
  styleUrls: ['./tinacos-admin.component.css']
})
export class TinacosAdminComponent implements OnInit {
  // Almacenará el arreglo paginado de usuarios con sus tinacos
  usersWithTinacos: any[] = [];
  isLoading: boolean = true;

  // Variables de paginación
  currentPage: number = 1;
  perPage: number = 30;
  totalPages: number = 0;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  // Cargar los usuarios (con tinacos) según la página solicitada
  loadUsers(page: number): void {
    this.adminService.obtenerUsuariosConTinacos(page, this.perPage).subscribe({
      next: (response: any) => {
        // Se asume que la respuesta paginada tiene una estructura con "data", "current_page" y "last_page"
        this.usersWithTinacos = response.data;
        this.currentPage = response.current_page;
        this.totalPages = response.last_page;
        this.isLoading = false;
        console.log(response);
      },
      error: (error) =>
        console.error('Error al obtener datos de usuarios con tinacos', error)
    });
  }

  // Getter para generar un arreglo de números de página
  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
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
  goToTinaco(tinaco: any): void {
    this.router.navigate(['/admin/tinacos', tinaco.id]);
  }

}

import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../Services/admin/admin.service';
import { LoadingSkeletonComponent } from '../../Components/loading-skeleton/loading-skeleton.component';
import { Fondo2Component } from '../fondo2/fondo2.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterLinkActive,CommonModule,LoadingSkeletonComponent, Fondo2Component],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  informacionesAdmin: any = {};
  isLoadingAdmin: boolean = true;

  constructor(private adminService: AdminService) {
    this.adminService.getinfoAdmin().subscribe({
      next: (response: any) => {
        this.informacionesAdmin = response; // Asigna directamente el objeto
        this.isLoadingAdmin = false;
        console.log(response);
      },
      error: (error) => console.error('Error al obtener datos del usuario', error)
    })
  }

}

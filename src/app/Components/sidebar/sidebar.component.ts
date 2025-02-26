import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../Services/admin/admin.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  informacionesAdmin: any = {};

  constructor(private adminService: AdminService) {
    this.adminService.getinfoAdmin().subscribe({
      next: (response: any) => {
        this.informacionesAdmin = response; // Asigna directamente el objeto
        console.log(response);
      },
      error: (error) => console.error('Error al obtener datos del usuario', error)
    })
  }

}

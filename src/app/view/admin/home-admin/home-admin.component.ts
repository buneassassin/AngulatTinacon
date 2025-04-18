import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHoverComponent } from '../../../Components/card-hover/card-hover.component';
import { HeaderComponent } from '../../../Components/header/header.component';
import { AdminService } from '../../../Services/admin/admin.service';
import { LoadingSkeletonComponent } from '../../../Components/loading-skeleton/loading-skeleton.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    CommonModule,
    CardHoverComponent,
    HeaderComponent,
    LoadingSkeletonComponent,
    RouterLink,
  ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css',
})
export class HomeAdminComponent implements OnInit {
  informacionesUser: any = {}; // Ahora es un objeto en lugar de un array
  informacionesTinaco: any = {};
  informacionesAdmin: any = {};
  isLoading: boolean = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUserStatistics().subscribe({
      next: (response: any) => {
        this.informacionesUser = response; // Asigna directamente el objeto
        //console.log(response);
      },
      error: (error) => {
        //console.error('Error al obtener datos del usuario', error),
      },
    });
    this.adminService.getTinacoStatistics().subscribe({
      next: (response: any) => {
        this.informacionesTinaco = response; // Asigna directamente el objeto
        //console.log(response);
      },
      error: (error) => {
        //console.error('Error al obtener datos del usuario', error),
      },
    });
    this.adminService.getinfoAdmin().subscribe({
      next: (response: any) => {
        this.informacionesAdmin = response; // Asigna directamente el objeto
        //console.log(response);
      },
      error: (error) => {
        //console.error('Error al obtener datos del usuario', error),
      },
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}

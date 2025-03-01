import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RectangleRowsComponent } from '../../Components/rectangle-rows/rectangle-rows.component';
import { CommonModule } from '@angular/common';
import { Tinacos } from '../../Interface/Tinacon/tinacos';
import { TinacoService } from '../../Services/tinaco/tinaco.service';
import { LoadingSkeletonComponent } from '../../Components/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-tinaco',
  standalone: true,
  imports: [RouterModule, RectangleRowsComponent, CommonModule, LoadingSkeletonComponent],
  templateUrl: './tinaco.component.html',
  styleUrls: ['./tinaco.component.css']
})
export class TinacoComponent implements OnInit {
  tinacos: Tinacos[] = [];
  isModalOpen = false;
  isLoading: boolean = true;


  constructor(private tinacoService: TinacoService) {
  }


  ngOnInit(): void {
    this.tinacoService.getTinacos().subscribe({
      next: (response: any) => {
        // Se espera que la API devuelva un arreglo de tinacos
        this.tinacos = response;
        this.isLoading = false;
        console.log('Tinacos:', response);
      },
      error: (error) => console.error('Error al obtener tinacos:', error)
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveModal(): void {
    console.log('Guardado con éxito');
    this.closeModal();
  }

  toggleTinaco(t: Tinacos): void {
    t.nivel_del_agua = t.nivel_del_agua > 0 ? 0 : 100;
  }
}

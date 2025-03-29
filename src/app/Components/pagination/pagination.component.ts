import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() pagination: any; // Ejemplo: { current_page: number, last_page: number, prev_page_url: string|null, next_page_url: string|null }
  @Output() pageChange = new EventEmitter<number>();

  // Emite el número de página seleccionado
  goToPage(page: number): void {
    if (page >= 1 && page <= this.pagination.last_page && page !== this.pagination.current_page) {
      this.pageChange.emit(page);
    }
  }

  // Calcula las páginas a mostrar: máximo 4 números en la vista
  get displayPages(): number[] {
    const total = this.pagination.last_page;
    const current = this.pagination.current_page;
    let pages: number[] = [];

    if (total <= 4) {
      // Si el total de páginas es menor o igual a 4, mostrar todas
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Si estamos cerca del inicio
      if (current <= 2) {
        pages = [1, 2, 3, 4];
      }
      // Si estamos cerca del final
      else if (current >= total - 1) {
        pages = [total - 3, total - 2, total - 1, total];
      }
      // En caso intermedio: ventana deslizante
      else {
        pages = [current - 1, current, current + 1, current + 2];
      }
    }
    return pages;
  }
}

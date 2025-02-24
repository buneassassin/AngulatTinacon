import { CommonModule} from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-rectangle-rows',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rectangle-rows.component.html',
  styleUrl: './rectangle-rows.component.css'
})
export class RectangleRowsComponent {
  @Input() features: { title: string; description?: string; nivel_del_agua?: number; id_tinaco?: number }[] = [];
  getColor(nivel: number): string {
    if (nivel >= 70) {
      return 'green';
    } else if (nivel >= 40) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
  getBarHeight(nivel: number): string {
    if (nivel < 0) {
      nivel = 0;
    } else if (nivel > 100) {
      nivel = 100;
    }
    return nivel + '%'; // Retorna algo como "50%"
  }
  
}

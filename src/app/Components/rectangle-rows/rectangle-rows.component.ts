import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-rectangle-rows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rectangle-rows.component.html',
  styleUrl: './rectangle-rows.component.css'
})
export class RectangleRowsComponent {
  @Input() features: { title: string; description: string }[] = [];

}

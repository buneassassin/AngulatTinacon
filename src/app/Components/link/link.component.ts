import { Component, Input  } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-link',
  imports: [RouterModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent {
  @Input() url: string = '#'; // Valor por defecto

}

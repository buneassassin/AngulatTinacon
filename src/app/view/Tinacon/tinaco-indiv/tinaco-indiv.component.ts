import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tinaco-indiv',
  imports: [CommonModule],
  templateUrl: './tinaco-indiv.component.html',
  styleUrl: './tinaco-indiv.component.css'
})
export class TinacoIndivComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  //housingService = inject(Tinaco); // para cuando tengamos algun servicio

 

}

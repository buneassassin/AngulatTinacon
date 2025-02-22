import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHoverComponent } from '../../../Components/card-hover/card-hover.component';
import { HeaderComponent } from '../../../Components/header/header.component';


@Component({
  selector: 'app-home-admin',
  imports: [CommonModule,CardHoverComponent, HeaderComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {

}


import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardHoverComponent } from '../../Components/card-hover/card-hover.component';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, CommonModule, CardHoverComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  title = 'IntegradoraAngularTinacon';
}

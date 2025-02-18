import { Component } from '@angular/core';
import { NavComponent } from '../../Components/nav/nav.component';
import { FooterComponent } from '../../Components/footer/footer.component';
// ruter
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [NavComponent, RouterModule, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  title = 'IntegradoraAngularTinacon'; 

}

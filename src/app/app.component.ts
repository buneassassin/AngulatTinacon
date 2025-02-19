import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,FooterComponent,NavComponent], // Importa RouterOutlet aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IntegradoraAngularTinacon';
}

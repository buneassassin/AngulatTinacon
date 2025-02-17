import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './Components/nav/nav.component'; // 🚀 Importa el Navbar

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ NavComponent], // ✅ Importa los componentes aquí
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IntegradoraAngularTinacon';
}

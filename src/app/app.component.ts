import { Component } from '@angular/core';
import { NavComponent } from './Components/nav/nav.component'; // 🚀 Importa el Navbar

@Component({
  selector: 'app-root',
  imports: [ NavComponent], // ✅ Importa los componentes aquí
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IntegradoraAngularTinacon';
}

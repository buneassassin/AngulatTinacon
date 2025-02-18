import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../../Components/nav/nav.component';
import { FooterComponent } from '../../Components/footer/footer.component';


@Component({
  selector: 'app-home',
  imports: [RouterModule, NavComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

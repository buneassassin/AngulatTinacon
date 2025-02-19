import { Component } from '@angular/core';
import { NavComponent } from '../../Components/nav/nav.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import {  RouterModule } from '@angular/router';
@Component({
  selector: 'app-tinaco',
  imports: [ NavComponent, FooterComponent, RouterModule],
  templateUrl: './tinaco.component.html',
  styleUrl: './tinaco.component.css'
})
export class TinacoComponent {

}

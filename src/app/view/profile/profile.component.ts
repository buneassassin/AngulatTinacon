import { Component } from '@angular/core';
import { NavComponent } from '../../Components/nav/nav.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  title = 'IntegradoraAngularTinacon'; 

}

import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  imports: [ RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  title = 'IntegradoraAngularTinacon'; 
}

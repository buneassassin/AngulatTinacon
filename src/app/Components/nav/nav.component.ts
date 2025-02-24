import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Usa CommonModule en lugar de BrowserModule


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    // Actualiza la variable según la existencia del token
    this.isLoggedIn = !!localStorage.getItem('token');
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../Interface/user';
import { HeaderComponent } from '../../../Components/header/header.component';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent {
  users: User[] = [
    

  ];
  
  get adminCount(): number {
    return this.users.filter(u => u.rol === 'Administrador').length;
  }

  get userCount(): number {
    return this.users.filter(u => u.rol === 'Usuario').length;
  }
}

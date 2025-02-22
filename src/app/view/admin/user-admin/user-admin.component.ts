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
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Administrador' },
    { id: 2, name: 'Ana García', email: 'ana@example.com', role: 'Usuario' },
    { id: 3, name: 'Carlos Ruiz', email: 'carlos@example.com', role: 'Usuario' },
    { id: 4, name: 'Laura Sánchez', email: 'laura@example.com', role: 'Moderador' }
  ];
  
  get adminCount(): number {
    return this.users.filter(u => u.role === 'Administrador').length;
  }

  get userCount(): number {
    return this.users.filter(u => u.role === 'Usuario').length;
  }
}

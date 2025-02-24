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
    { id: 1, usuario_nom: 'Juan Pérez', email: 'juan@example.com', rol: 'Administrador',id_persona: 1,email_verified_at: '', foto_perfil: '', is_active: true, is_Inactive: false, password: '', apellidoMaterno: '', apellidoPaterno: '', nombres: '', telefono: ''  },
    

  ];
  
  get adminCount(): number {
    return this.users.filter(u => u.rol === 'Administrador').length;
  }

  get userCount(): number {
    return this.users.filter(u => u.rol === 'Usuario').length;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tinacos } from '../../../Interface/Tinacon/tinacos';



@Component({
  selector: 'app-tinacos-admin',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './tinacos-admin.component.html',
  styleUrls: ['./tinacos-admin.component.css']
})
export class TinacosAdminComponent {
  tinacos: Tinacos[] = [
    { id: 1, name: 'Tinaco A', owner: 'Juan Pérez', isOn: true, nivel_del_agua: 75 },
    { id: 2, name: 'Tinaco B', owner: 'Ana García', isOn: true, nivel_del_agua: 60 },
    { id: 3, name: 'Tinaco C', owner: 'Carlos Ruiz', isOn: false, nivel_del_agua: 30 },
    { id: 4, name: 'Tinaco D', owner: 'Laura Sánchez', isOn: true, nivel_del_agua: 90 }
  ];

  toggleTinaco(t: Tinacos): void {
    t.isOn = !t.isOn;
  }

  get totalTinacos(): number {
    return this.tinacos.length;
  }

  get activeTinacos(): number {
    return this.tinacos.filter(t => t.isOn).length;
  }
}

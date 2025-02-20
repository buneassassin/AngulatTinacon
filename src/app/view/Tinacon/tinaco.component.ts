import { Component } from '@angular/core';
import { NavComponent } from '../../Components/nav/nav.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import {  RouterModule } from '@angular/router';
import { RectangleRowsComponent} from '../../Components/rectangle-rows/rectangle-rows.component';
@Component({
  selector: 'app-tinaco',
  standalone: true,
  imports: [RouterModule, RectangleRowsComponent],
  templateUrl: './tinaco.component.html',
  styleUrl: './tinaco.component.css'
})
export class TinacoComponent {
  features = [
    { title: 'Tinaco1', nivel_del_agua: 100},
    { title: 'Tinaco2', nivel_del_agua: 50 },
    { title: 'Tinaco3', nivel_del_agua: 30 },
    { title: 'Tinaco4', nivel_del_agua: 20 },
    { title: 'Tinaco5', nivel_del_agua: 10 },
    { title: 'Tinaco6', nivel_del_agua: 6 },
    { title: 'Tinaco7', nivel_del_agua: 5 },
  ];
}

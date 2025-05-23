import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() imgSrc: string = '';
  @Input() imgAlt: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}

import { AfterViewInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Declara bootstrap para que TypeScript reconozca su uso
declare var bootstrap: any;

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {
  @Input() images: { src: string; alt?: string }[] = [];
  @Input() carouselId: string = 'carouselExampleIndicators';
  @Input() height: string = '700px';

  ngAfterViewInit(): void {
    // Inicializa manualmente el carrusel para que se auto-slide
    const carouselElement = document.getElementById(this.carouselId);
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 5000, // Intervalo en milisegundos
        ride: 'carousel'
      });
    }
  }
}

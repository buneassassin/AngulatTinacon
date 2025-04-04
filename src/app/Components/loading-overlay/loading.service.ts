import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // Estado de loading; true: mostrar overlay, false: ocultar overlay
  public loading$ = new BehaviorSubject<boolean>(false);

  show() {
    this.loading$.next(true);
  }

  hide() {
    this.loading$.next(false);
  }
}

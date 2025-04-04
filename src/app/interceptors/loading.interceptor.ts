import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../Components/loading-overlay/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Mostrar el overlay al iniciar la petición
    this.loadingService.show();
    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide()) // Ocultar al finalizar
    );
  }
}

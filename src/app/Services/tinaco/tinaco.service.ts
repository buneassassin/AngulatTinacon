import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TinacoService {

  private baseUrl = 'https://conejosaltando.fun/api/v1'; // URL base de tu API

  constructor(private http: HttpClient) {}

  getTinacos(): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/tinaco`, { headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SensoresServicioService {
  private baseUrl = 'https://conejosaltando.fun/api/v1'; // URL base de tu API

  constructor(private http: HttpClient) {}

  getTinaco(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/tinaco/${id}`, { headers });
  }
  getTemperatura( tinaco_id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/temperatura`, tinaco_id ,{ headers });
  }

  getPH( tinaco_id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/ph`,tinaco_id, { headers });
  }

  getTurbidez( tinaco_id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/turbidez`,tinaco_id , { headers });
  }

  getTDS( tinaco_id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/tds`,tinaco_id, { headers });
  }

  getUltrasonico( tinaco_id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/ultrasonico`,tinaco_id, { headers });
  }
}

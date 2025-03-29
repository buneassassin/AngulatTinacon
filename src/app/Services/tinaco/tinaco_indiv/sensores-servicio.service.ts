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
  getTemperatura( data: {tinaco_id:number}): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/temperatura`, data ,{ headers });
  }

  getPH( data: {tinaco_id:number}): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/ph`,data, { headers });
  }

  getTurbidez( data: {tinaco_id:number}): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/turbidez`,data , { headers });
  }

  getTDS( data: {tinaco_id:number}): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/tds`,data, { headers });
  }

  getUltrasonico( data: {tinaco_id:number}): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/ultrasonico`,data, { headers });
  }
  //    Route::post('v1/reporte-datos-sensor-tinaco', [ReporteController::class, 'obtenerHistorialPorSensorPorTinaco']);
  getReporte( data: {tinaco_id:number, sensor_id:number},page:number): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/reporte-datos-sensor?page=${page}`,data, { headers });
  }
}

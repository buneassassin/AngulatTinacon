import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// Importa tus interfaces (modelos) si las tienes
import { User } from '../../Interface/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://conejosaltando.fun/api/v1'; // URL base de tu API

  constructor(private http: HttpClient) {}
  // Registro de usuario
  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
  // Login de usuario
  loginUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }
  // me de los datos del usuario
  getUserData(): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/me`, { headers });
  }
  // logout de usuario
  logoutUser(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }
  // Actualizar datos de usuario
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, user);
  }
  resetPassword(email: string): Observable<any> {
    const url = `${this.baseUrl}/reset-password`;
    return this.http.post(url, { email });
  }

 
}

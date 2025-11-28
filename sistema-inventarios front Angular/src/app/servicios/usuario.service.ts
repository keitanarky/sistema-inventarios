import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { LoginRequest } from '../models/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/api'; // apunta al backend

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, request);
  }
}
export { LoginRequest };

0
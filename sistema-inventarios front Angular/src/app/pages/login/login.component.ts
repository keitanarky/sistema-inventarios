import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ FormsModule necesario
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest, UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/usuario.model';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // ✅ FormsModule incluido
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = '';
  password = '';
  error = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onLogin() {
    const loginData: LoginRequest = {
      usuario: this.usuario,
      password: this.password
    };

    this.usuarioService.login(loginData).subscribe({
      next: (usuario: Usuario) => {
        console.log('Login exitoso', usuario);
        // Redirigir al inicio o guardar token si es necesario
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error('Error login', err);
        this.error = 'Usuario o contraseña incorrecta';
      }
    });
  }
}
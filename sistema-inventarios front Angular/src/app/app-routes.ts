import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PortadaComponent } from './pages/portada/portada.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { SnakeComponent } from './pages/snake/snake.component';
import { AsteroidesComponent } from './pages/asteroides/asteroides.component';
import { ExistenciasComponent } from './pages/existencias/existencias.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';

export const routes: Routes = [

  // ⭐ Ruta inicial -> LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // ⭐ Ruta padre -> INICIO
  {
    path: 'inicio',
    component: PortadaComponent,
    children: [

      // 📦 RUTA PADRE -> VENTAS
      {
        path: 'venta',
        component: VentasComponent,
        children: [
          { path: 'carrito', component: CarritoComponent }
        ]
      },

      // 🎮 RUTA PADRE -> JUEGOS
      {
        path: 'juegos',
        component: JuegosComponent,
        children: [
          { path: 'snake', component: SnakeComponent },
          { path: 'asteroides', component: AsteroidesComponent }
        ]
      },

      // 📰 RUTA PADRE -> NOTICIAS
      {
        path: 'noticias',
        component: NoticiasComponent
      },

      // 📦 RUTA PADRE -> EXISTENCIAS
      {
        path: 'existencias',
        component: ExistenciasComponent,
        children: [
          { path: 'agregar', component: AgregarProductoComponent },
          { path: 'editar/:id', component: EditarProductoComponent }
        ]
      }

    ]
  },

  // 🚫 Si no existe la ruta, enviar al Login
  { path: '**', redirectTo: 'login' }
];

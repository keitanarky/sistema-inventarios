import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 // ✅ URL corregida: apunta directo al backend
  private urlBase = 'http://localhost:8080/productos';

  constructor(private clienteHttp: HttpClient) { }

  // Obtener lista de productos
  obtenerProductosLista(): Observable<Producto[]> {
    return this.clienteHttp.get<Producto[]>(this.urlBase);
  }

  // Agregar un nuevo producto
  agregarProducto(producto: Producto): Observable<Producto> {
    return this.clienteHttp.post<Producto>(this.urlBase, producto);
  }

  // Obtener un producto por ID
  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.clienteHttp.get<Producto>(`${this.urlBase}/${id}`);
  }

  // Editar un producto existente
  editarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.clienteHttp.put<Producto>(`${this.urlBase}/${id}`, producto);
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<void> {
    return this.clienteHttp.delete<void>(`${this.urlBase}/${id}`);
  }

}
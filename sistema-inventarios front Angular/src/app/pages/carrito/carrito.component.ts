import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  pagaCon: number = 0;
cambio: number = 0;

calcularCambio() {
  this.cambio = this.pagaCon - this.total;
  if (this.cambio < 0) {
    this.cambio = 0; // no mostrar negativo
  }
}
metodoPago: any;
seleccionarPago(arg0: string) {
throw new Error('Method not implemented.');
}
  carrito = [
    { codigo: 'P001', nombre: 'Manzanas Fuji', cantidad: 2, precio: 25.50 },
    { codigo: 'P002', nombre: 'Leche Entera', cantidad: 1, precio: 18.00 },
    { codigo: 'P003', nombre: 'Pan Integral', cantidad: 3, precio: 15.75 }
  ];

  total = 0;



  ngOnInit(): void {
    this.actualizarTotal();
  }

  actualizarTotal(): void {
    this.total = this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  eliminarProducto(index: number): void {
    this.carrito.splice(index, 1);
    this.actualizarTotal();
  }

  finalizarCompra(): void {
    alert(`✅ Compra finalizada. Total: $${this.total.toFixed(2)}`);
    this.carrito = [];
    this.total = 0;
  }
}

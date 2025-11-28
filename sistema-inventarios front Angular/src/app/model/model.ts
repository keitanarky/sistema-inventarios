// src/app/model/model.ts

export class Producto {
cantidad: any;
  patchValue(data: Producto) {
    throw new Error('Method not implemented.');
  }
  invalid: any;
  reset() {
    throw new Error('Method not implemented.');
  }
  idproducto?: number;       // opcional (cuando el producto aún no existe)
  descripcion!: string;
  precio!: number;
  existencia!: number;

  constructor(
    descripcion: string = '',
    precio: number = 0,
    existencia: number = 0,
    idproducto?: number
  ) {
    this.descripcion = descripcion;
    this.precio = precio;
    this.existencia = existencia;
    this.idproducto = idproducto;
  }
}





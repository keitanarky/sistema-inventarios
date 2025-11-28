import { Component, inject } from '@angular/core';
import { Producto } from '../../model/model';
import { ProductoService } from '../../servicios/producto.service';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
@Component({
  selector: 'app-existencias',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './existencias.component.html',
  styleUrl: './existencias.component.css'
})
export class ExistenciasComponent {
   productos! : Producto[];
  errorMessage: string= 'No existen productos;'
    constructor(
    private productoServicio: ProductoService,
    private router: Router,
    private route: ActivatedRoute) {}
    private enrutador = inject(Router);
  
  
    ngOnInit(): void {
      this.cargarProductos();
    }


  cargarProductos() {
    this.productoServicio.obtenerProductosLista().subscribe({
      next: (res) => this.productos = res,
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.errorMessage = 'No se pudieron cargar los productos.';
      }
    });
  }

  

//botones para moverse entre rutas
  
editar_producto(id : number|any) {
this.router.navigate(['editar/',id], { relativeTo: this.route }); 

}


eliminarProducto() {
throw new Error('Method not implemented.');
}



agregarProducto() {
this.router.navigate(['agregar'], { relativeTo: this.route });
}

  
    
        
    

}

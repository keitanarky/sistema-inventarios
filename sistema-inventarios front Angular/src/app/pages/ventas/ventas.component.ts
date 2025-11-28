import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
finalizarCompra() {
throw new Error('Method not implemented.');
}

filtro: any;
productos: any;
cambio: any;
agregarAlCarrito(_t11: any) {
throw new Error('Method not implemented.');
}


constructor(private router: Router, private route: ActivatedRoute) {}

  
  //ruta para carrito
  verCarrito(): void {
    this.router.navigate(['carrito'], { relativeTo: this.route }); // 👈 nota el cambio
  }
}

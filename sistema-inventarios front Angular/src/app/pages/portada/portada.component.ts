import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-portada',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css'
})
export class PortadaComponent {

constructor(private router: Router, private route: ActivatedRoute) {}


//ruta para existencias
  irAExistencias(): void {
    this.router.navigate(['existencias'], { relativeTo: this.route }); 
  }

  //ruta para ventas
  irANuevoCliente(): void {
    this.router.navigate(['venta'], { relativeTo: this.route }); 
  }

  //ruta para noticias
  irANoticias(): void {
    this.router.navigate(['noticias'], { relativeTo: this.route }); 
  }

  //ruta para snake
  irAJuegos(): void {
    this.router.navigate(['juegos'], { relativeTo: this.route }); 
  }
  

}

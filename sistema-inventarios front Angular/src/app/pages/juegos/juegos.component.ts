import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.css'
})
export class JuegosComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  //ruta para snake
  snake(): void {
    this.router.navigate(['snake'], { relativeTo: this.route }); // 👈 nota el cambio
  }

  //ruta para asteroide
  asteroides(): void {
    this.router.navigate(['asteroides'], { relativeTo: this.route }); // 👈 nota el cambio
  }

}

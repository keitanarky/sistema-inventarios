import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // ✅ debe estar aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ plural
})
export class AppComponent {
  title = 'sistema-inventarios-app';
}

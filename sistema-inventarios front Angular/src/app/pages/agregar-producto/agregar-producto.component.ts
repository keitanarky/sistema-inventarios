import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Producto } from '../../model/model';
import { ProductoService } from '../../servicios/producto.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
//producto
producto :Producto=new Producto();
private productoServicio = inject(ProductoService);
private enrutador = inject(Router);



style: any;

  //botones


  get f(): { [key in  'descripcion' | 'precio' | 'cantidad']: any } {
  return this.productoForm.controls as any;
}
  productoForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario
    this.productoForm = this.fb.group({
      
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      cantidad: ['', [Validators.required, Validators.min(0)]]
    });
  }

  guardarProducto() {
      this.productoServicio.agregarProducto(this.producto).subscribe({
        next:(datos) => this.irAExistencias(),
        error:(error) =>console.log("Error al guardar producto: ",error)
      });
      
    }


  irAExistencias(): void {
    this.enrutador.navigate(['/existencias']);
  }


  onSubmit() {
    this.submitted = true;
    this.guardarProducto();
    if (this.productoForm.invalid) {
      return;
    }

    

    // Aquí puedes llamar a tu servicio para guardar el producto en el backend
    console.log('Producto agregado:', this.productoForm.value);
    alert('Producto agregado correctamente!');

    // Reiniciar formulario después de agregar
    this.productoForm.reset();
    this.submitted = false;
  }

  onReset() {
    this.productoForm.reset();
    this.submitted = false;
  }

}



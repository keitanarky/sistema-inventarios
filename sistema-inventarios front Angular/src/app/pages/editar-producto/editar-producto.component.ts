import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { Producto } from '../../model/model';
import { ProductoService } from '../../servicios/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {
actualizar() {
throw new Error('Method not implemented.');
}
onSubmit() {
throw new Error('Method not implemented.');
}
//producto
id!:number;
form!: FormGroup;


producto :Producto=new Producto();
private ruta = inject(ActivatedRoute);
private productoServicio = inject(ProductoService);
private enrutador = inject(Router);

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private fb: FormBuilder
  ) {}

productos: any[] = [];

ngOnInit(): void {

  // Crear el formulario
  this.form = this.fb.group({
    descripcion: [''],
    precio: [''],
    existencia: ['']
  });

  // 🔥 Escuchar cambios en el parámetro "id"
  this.route.paramMap.subscribe(params => {
    this.id = Number(params.get('id'));
    this.cargarProducto();
  });
}

  cargarProducto() {
    this.productoService.obtenerProductoPorId(this.id).subscribe(data => {
      this.form.patchValue(data);
    });
  }


  //botones

  

  guardarProducto() {
      this.productoServicio.editarProducto(this.id,this.producto).subscribe({
next: (datos)=> this.irAExistencias(),
        error:(error)=> console.log('Error al guardar productos existentes: ',error)

      });
      
    }

    editar_producto(id: number) {
  this.productoServicio.obtenerProductoPorId(id).subscribe(data => {
    console.log("Producto recibido:", data);
    // aquí cargas los datos al formulario o navegas a otra pantalla
  });
}


  irAExistencias(): void {
    this.enrutador.navigate(['existencias']);
  }





}



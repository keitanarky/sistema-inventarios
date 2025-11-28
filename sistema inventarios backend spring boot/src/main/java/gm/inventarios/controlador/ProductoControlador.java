package gm.inventarios.controlador;

import gm.inventarios.Servicio.ProductoServicio;
import gm.inventarios.modelo.Producto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/sistema-inventarios-app/productos")
@CrossOrigin(origins = "http://localhost:4200") // Permite conexión desde Angular
public class ProductoControlador {

    private final ProductoServicio productoServicio;
    private  static  final Logger logger= LoggerFactory.getLogger(ProductoControlador.class);
    @Autowired
    public ProductoControlador(ProductoServicio productoServicio) {
        this.productoServicio = productoServicio;
    }

    // ==============================
    //  LISTAR TODOS LOS PRODUCTOS
    // ==============================
    @GetMapping
    public List<Producto> listarProductos() {
        List<Producto> productos=productoServicio.listarProductos();
        logger.info("Productos obtenidos:");
        //iteramos todo el arreglo
        productos.forEach((producto -> logger.info(producto.toString())));
        return productos;
    }

    // ==============================
    //  BUSCAR POR ID
    // ==============================
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable Integer id) {
        Producto producto = productoServicio.buscarProductoPorId(id);
        if (producto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(producto);
    }

    // ==============================
    //  AGREGAR NUEVO PRODUCTO
    // ==============================
    @PostMapping
    public ResponseEntity<Producto> agregarProducto(@RequestBody Producto producto) {
        Producto nuevo = productoServicio.guardar(producto);
        return ResponseEntity.ok(nuevo);
    }

    // ==============================
    //  ACTUALIZAR PRODUCTO
    // ==============================
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Integer id, @RequestBody Producto detalles) {
        Producto existente = productoServicio.buscarProductoPorId(id);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        existente.setDescripcion(detalles.getDescripcion());
        existente.setPrecio(detalles.getPrecio());
        existente.setExistencia(detalles.getExistencia());

        Producto actualizado = productoServicio.guardar(existente);
        return ResponseEntity.ok(actualizado);
    }

    // ==============================
    //  ELIMINAR PRODUCTO
    // ==============================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Integer id) {
        try {
            productoServicio.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

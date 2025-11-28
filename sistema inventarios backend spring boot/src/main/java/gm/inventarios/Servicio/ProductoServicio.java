package gm.inventarios.Servicio;

import gm.inventarios.modelo.Producto;
import gm.inventarios.repositorio.ProductoRepositorio;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;


@Service
@Transactional
public class ProductoServicio implements IProductoServicio {

    private final ProductoRepositorio productoRepositorio;

    public ProductoServicio(ProductoRepositorio productoRepositorio)
    {
        this.productoRepositorio= productoRepositorio;
    }




    @Override
    @Transactional(readOnly = true)
    public List<Producto> listarProductos() {
        return productoRepositorio.findAll();
    }





    @Override
    public Producto buscarProductoPorId(Integer idproducto) {

        return productoRepositorio.findById(idproducto).orElse(null);
    }

    @Override
    public Producto guardar(Producto producto) {
        //sirve tanto para guardar como para actualizar
        return productoRepositorio.save(producto);
    }//termina el metodo guardar


    //metodo guardar
    @Override
    public void eliminar(Integer idproducto) {
        if(!productoRepositorio.existsById(idproducto)){
            throw  new NoSuchElementException("No existe producto con id: "+ idproducto);
        }
        productoRepositorio.deleteById(idproducto);
    }
    //fin metodo guardar


}



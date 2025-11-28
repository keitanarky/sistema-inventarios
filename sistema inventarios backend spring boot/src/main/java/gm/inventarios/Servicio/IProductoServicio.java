package gm.inventarios.Servicio;

import gm.inventarios.modelo.Producto;

import java.util.List;

public interface IProductoServicio {
    List<Producto> listarProductos();


    Producto buscarProductoPorId(Integer idproducto);


    Producto guardar(Producto producto);

    //metodos void  no return
    void eliminar(Integer idproducto);


}

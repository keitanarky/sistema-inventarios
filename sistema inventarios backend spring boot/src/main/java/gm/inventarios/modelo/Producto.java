package gm.inventarios.modelo;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Integer idproducto;
    String descripcion;
    Double precio;
    Integer existencia;

    public  Producto(){
        this.idproducto = idproducto;

    }

    public Producto(String descripcion, Double precio, Integer existencia) {
        this.descripcion = descripcion;
        this.precio = precio;
        this.existencia = existencia;
    }

    public Producto(Integer idproducto, String descripcion, Double precio, Integer existencia) {
        this.idproducto = idproducto;
        this.descripcion = descripcion;
        this.precio = precio;
        this.existencia = existencia;
    }
}

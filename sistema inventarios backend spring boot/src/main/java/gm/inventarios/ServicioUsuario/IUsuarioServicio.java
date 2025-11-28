package gm.inventarios.ServicioUsuario;
import gm.inventarios.modelo.Producto;
import gm.inventarios.modelo.Usuario;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IUsuarioServicio {
    Usuario log(String usuario, String password);

    @Transactional(readOnly = true)
    List<Usuario> listarUsuarios();

    Usuario buscarUsuarioPorId(Integer idUsuario);



    Usuario guardar(Usuario usuario)//termina el metodo guardar
    ;

    //metodo guardar
    void eliminar(Integer idproducto);
}
package gm.inventarios.ServicioUsuario;

import gm.inventarios.modelo.Usuario;
import gm.inventarios.repositorio.UsuarioRepositorio;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class UsuarioServicio implements IUsuarioServicio {

    private final UsuarioRepositorio usuarioRepositorio;

    public UsuarioServicio(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario buscarUsuarioPorId(Integer id) {
        return usuarioRepositorio.findById(id).orElse(null);
    }

    @Override
    public Usuario guardar(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    @Override
    public void eliminar(Integer id) {
        if (!usuarioRepositorio.existsById(id)) {
            throw new NoSuchElementException("No existe usuario con id: " + id);
        }
        usuarioRepositorio.deleteById(id);
    }


    @Override
    public Usuario log(String usuario, String password) {
        return usuarioRepositorio.findByUsuarioAndPassword(usuario, password).orElse(null);
    }
}

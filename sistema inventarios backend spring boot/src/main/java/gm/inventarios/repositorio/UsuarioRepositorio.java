package gm.inventarios.repositorio;

import gm.inventarios.modelo.Usuario;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByUsuarioAndPassword(String usuario, String password);

}


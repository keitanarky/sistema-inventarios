package gm.inventarios.controlador;
import gm.inventarios.ServicioUsuario.IUsuarioServicio;
import gm.inventarios.ServicioUsuario.UsuarioServicio;
import  gm.inventarios.modelo.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import  org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
    @RequestMapping("/sistema-inventarios-app/productos")
@CrossOrigin(origins = "http://localhost:4200") // Permite conexión desde Angular
    public class UsuarioControlador {

        private final UsuarioServicio usuarioServicio;
        private static final Logger logger = LoggerFactory.getLogger(UsuarioControlador.class);

        @Autowired
        // Constructor correcto con inyección de dependencias
        public UsuarioControlador(UsuarioServicio usuarioServicio) {

            this.usuarioServicio = usuarioServicio;
        }

        // Ejemplo de endpoint
        @GetMapping
        public List<Usuario> listarUsuarios() {
            logger.info("Listando todos los usuarios");
            return null;
        }

        @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable Integer id){
            Usuario usuario = usuarioServicio.buscarUsuarioPorId(id);
            if (usuario == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(usuario);
        }
    }



package gm.inventarios.controlador;
import gm.inventarios.ServicioUsuario.IUsuarioServicio;
import gm.inventarios.modelo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private IUsuarioServicio service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario req) {
        Usuario u = service.log(req.getUsuario(), req.getPassword());
        if (u == null) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
        // Recomiendo NO devolver el password en la respuesta
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }
}
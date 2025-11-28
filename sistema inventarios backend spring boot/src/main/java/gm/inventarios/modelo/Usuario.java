package gm.inventarios.modelo;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@Table(name = "Usuario") // Nombre exacto de la tabla en SQL Server
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEmpleado")
    private Integer idEmpleado;

    private String nombre;
    private String apellido;
    private String curp;

    @Temporal(TemporalType.DATE)
    private Date fechaNacimiento;

    private String telefono;
    private String correo;
    private String direccion;
    private String puesto;

    @Temporal(TemporalType.DATE)
    private Date fechaContratacion;

    private BigDecimal salario;

    private String turno;
    private String estatus;

    private String usuario;
    private String password;

}

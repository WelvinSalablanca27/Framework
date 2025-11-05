import { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaEmpleados = ({ empleado, cargando, abrirModalEdicion, abrirModalEliminacion }) => {
    const [orden, setOrden] = useState({ campo: "id_empleado", direccion: "asc" });
    const manejarOrden = (campo) => {
        setOrden((prev) => ({
            campo,
            direccion: prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
        }));
    };


    const empleadoOrdenadas = [...empleado].sort((a, b) => {
        const valorA = a[orden.campo];
        const valorB = b[orden.campo];

        if (typeof valorA === "number" && typeof valorB === "number") {
            return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
        }

        const comparacion = String(valorA).localeCompare(String(valorB));
        return orden.direccion === "asc" ? comparacion : -comparacion;
    });
    if (cargando)
        return (
            <>

                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </>

        );
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <BotonOrden campo="id_cliente" orden={orden} manejarOrden={manejarOrden}>
                            ID
                        </BotonOrden>

                        <BotonOrden campo="primer_nombre" orden={orden} manejarOrden={manejarOrden}>
                            Primer Nombre
                        </BotonOrden>

                        <BotonOrden campo="segundo_nombre" orden={orden} manejarOrden={manejarOrden}>
                            Segundo Nombre
                        </BotonOrden>

                        <BotonOrden campo="primer_apellido" orden={orden} manejarOrden={manejarOrden}>
                            Primer Apellido
                        </BotonOrden>

                        <BotonOrden campo="segundo_apellido" orden={orden} manejarOrden={manejarOrden}>
                            Segundo Apellido
                        </BotonOrden>

                        <BotonOrden campo="celular" orden={orden} manejarOrden={manejarOrden}>
                            Celular
                        </BotonOrden>

                        <BotonOrden campo="cargo" orden={orden} manejarOrden={manejarOrden}>
                            Cargo
                        </BotonOrden>


                        <BotonOrden campo="fecha_contratacion" orden={orden} manejarOrden={manejarOrden}>
                            Fecha Contratacion
                        </BotonOrden>

                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleadoOrdenadas.map((cliente) => (
                        <tr key={cliente.id_empleado}>
                            <td>{cliente.id_empleado}</td>
                            <td>{cliente.primer_nombre}</td>
                            <td>{cliente.segundo_nombre}</td>
                            <td>{cliente.primer_apellido}</td>
                            <td>{cliente.segundo_apellido}</td>
                            <td>{cliente.cargo}</td>
                            <td>{cliente.fecha_contratacion}</td>
                            <td>
                                <td>
                                    <Button
                                        variant="outline-warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => abrirModalEdicion(empleado)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => abrirModalEliminacion(empleado)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table >
        </>
    );
};
export default TablaEmpleados;

import { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaUsuarios = ({ usuarios, cargando }) => {

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
                        <BotonOrden campo="id_categoria" orden={orden} manejarOrden={manejarOrden}>
                            ID
                        </BotonOrden>

                        <BotonOrden campo="nombre_categoria" orden={orden} manejarOrden={manejarOrden}>
                            Usuario
                        </BotonOrden>

                        <BotonOrden campo="descripcion_categoria" orden={orden} manejarOrden={manejarOrden}>
                            Contraseña
                        </BotonOrden>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => {
                        return (
                            <tr key={usuario.id_usuario}>
                                <td>{usuario.id_usuario}</td>
                                <td>{usuario.usuario}</td>
                                <td>{usuario.contraseña}</td>
                                <td>Acción</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table >
        </>
    );
}
export default TablaUsuarios;

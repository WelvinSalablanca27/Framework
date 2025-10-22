import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TablaClientes from "../components/clientes/TablaClientes";

const cliente = () => {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenersetClientes = async () => {
        try {
            const respuesta = await fetch("http://localhost:3001/api/clientes");

            if (!respuesta.ok) {
                throw new Error("Error al obtener las clientes");
            }
            const datos = await respuesta.json();

            setClientes(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    useEffect(() => {
        obtenersetClientes();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>clientes</h4>
                <TablaClientes
                    clientes={clientes}
                    cargando={cargando} />
            </Container>
        </>
    );
}

export default cliente;

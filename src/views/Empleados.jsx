import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TablaEmpleados from "../components/empleados/TablaEmpleados";

const Empleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerEmpleados = async () => {
        try {
            const respuesta = await fetch("http://localhost:3001/api/empleados");

            if (!respuesta.ok) {
                throw new Error("Error al obtener las Empleados");
            }
            const datos = await respuesta.json();

            setEmpleados(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    useEffect(() => {
        obtenerEmpleados();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Registro de Empleados</h4>
                <TablaEmpleados
                    empleados={empleados}
                    cargando={cargando} />
            </Container>
        </>
    );
}

export default Empleados;
